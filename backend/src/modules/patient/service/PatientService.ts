import { IPatientRepository } from "../domain/repository/IPatientRepository";
import { CreatePatientRequest } from "../dto/CreatePatientRequestDTO";
import { DeletePatientRequest } from "../dto/DeletePatientRequestDTO";
import { ListPatientRequest } from "../dto/ListPatientRequestDTO";
import { PatientResponse } from "../dto/PatientResponseDTO";
import { UpdatePatientRequest } from "../dto/UpdatePatientRequestDTO";
import { IObservationRepository } from "../../observation/domain/repository/IObservationRepository";
import { ISecretaryRepository } from "../../secretary/domain/repository/ISecretaryRepository";
import { ObservationService } from "../../observation/service/ObservationService";
import { ObservationBody } from "../../observation/dto/ObservationBodyDTO";
import { ObservationResponse } from "../../observation/dto/ObservationResponseDTO";
import { AppError } from "../../../core/errors/AppError";
import bcrypt from "bcrypt";

export class PatientService {
  constructor(
    private patientRepository: IPatientRepository,
    private observationRepository: IObservationRepository,
    private secretaryRepository: ISecretaryRepository,
    private observationService = new ObservationService(observationRepository)
  ) {
  }

  async create(name: string, birthDay: Date, sex: string, cpf: string, ethnicity: string, email: string | undefined, observation: ObservationBody | undefined): Promise<PatientResponse> {
    if (!name || !birthDay || !sex || !cpf || !ethnicity) {
      throw new AppError("Missing required fields.", 400);
    }

    const patientExists = await this.patientRepository.findByCPF(cpf);
    if (patientExists) {
      throw new AppError("Patient already exists.", 409);
    }

    const registerData: CreatePatientRequest = {
      name,
      birthDay,
      sex,
      cpf,
      ethnicity,
      email
    };

    const patient = await this.patientRepository.createPatient(registerData);

    if (observation) {
        const obsRes = await this.observationService.create(
        observation.comorbidity ?? "",
        observation.allergies ?? "",
        observation.medications ?? "",
        patient.id
      );
        patient.observation = {
          id: obsRes.id,
          comorbidity: obsRes.comorbidity ?? null,
          allergies: obsRes.allergies ?? null,
          medications: obsRes.medications ?? null,
          patientId: obsRes.patientId
        };
    }

    return patient
  }

  async delete(id: string, secretaryPassword: string, userId: string | undefined): Promise<void> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new AppError("Patient not exists.", 404);
    }

    if (!userId) {
      throw new AppError("User authentication required.", 401);
    }

    const secretary = await this.secretaryRepository.findById(userId);
    if (!secretary) {
      throw new AppError("Secretary not found.", 404);
    }

    const passwordMatch = await bcrypt.compare(secretaryPassword, secretary.password);
        if (!passwordMatch){
            throw new AppError("Password invalid.", 401);
        }

    const deleteRequest: DeletePatientRequest = { id };
    await this.patientRepository.deletePatient(deleteRequest);
  }

  async update(
    id: string,
    name: string | undefined,
    birthDay: Date | undefined,
    sex: string | undefined,
    cpf: string | undefined,
    ethnicity: string | undefined,
    email: string | undefined,
    observation: ObservationBody | undefined
  ): Promise<PatientResponse> {
      const patient = await this.patientRepository.findById(id);
      if (!patient) {
        throw new AppError("Patient not exists.", 404);
      }

      if(id !== patient.id) {
        throw new AppError("Patient ID invalid.", 400);
      }

      const observationExists = await this.observationRepository.findByPatientId(id);

      const updateRequest: UpdatePatientRequest = {
        id,
        name,
        birthDay,
        sex,
        cpf,
        ethnicity,
        email
      };

      let updatedObservation : ObservationResponse | undefined = undefined;

      if (observation) {
        if (observationExists) {
          // Atualizar observation existente
          updatedObservation = await this.observationService.update(
            observationExists.id,
            observation.comorbidity ?? undefined,
            observation.allergies ?? undefined,
            observation.medications ?? undefined
          );
        } else {
          // Criar nova observation se não existir
          updatedObservation = await this.observationService.create(
            observation.comorbidity ?? '',
            observation.allergies ?? '',
            observation.medications ?? '',
            id
          );
        }
      }

      const updatedPatient = await this.patientRepository.updatePatient(updateRequest);

      const result: PatientResponse = {
        id: updatedPatient.id,
        name: updatedPatient.name,
        birthDay: updatedPatient.birthDay,
        sex: updatedPatient.sex,
        cpf: updatedPatient.cpf,
        ethnicity: updatedPatient.ethnicity,
        email: updatedPatient.email,
        observation: updatedObservation ? {
          id: updatedObservation.id,
          comorbidity: updatedObservation.comorbidity ?? null,
          allergies: updatedObservation.allergies ?? null,
          medications: updatedObservation.medications ?? null,
          patientId: updatedObservation.patientId
        } : undefined
      };

      return result;
    }

  async list(id: string, userId:string | undefined, userRole:string | undefined): Promise<PatientResponse> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new AppError("Patient not exists.", 404);
    }

    if (!userId || !userRole) {
      throw new AppError("User authentication required.", 401);
    }

    if (userRole === 'MEDIC') {
      const listedPatient = await this.patientRepository.listPatientByMedic(id, userId);
      if (listedPatient) {
        return listedPatient;
      }
    }

    const list: ListPatientRequest = { id: patient.id };

    const result = await this.patientRepository.listPatient(list)

    return result;
  }
  
  async listAll(userId:string | undefined, userRole:string | undefined, page:number|undefined, limit:number|undefined): Promise<PatientResponse[]> {
    if (!userId || !userRole) {
      throw new AppError("User authentication required.", 401);
    }

    if (userRole === "MEDIC") {
      return await this.patientRepository.listPatientsByMedic(userId, page, limit);
    }

    return await this.patientRepository.listPatients(page, limit);
  }

}
