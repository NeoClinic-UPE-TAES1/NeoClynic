import { IPatientRepository } from "../domain/repository/IPatientRepository";
import { CreatePatientRequest } from "../dto/CreatePatientRequestDTO";
import { DeletePatientRequest } from "../dto/DeletePatientRequestDTO";
import { ListPatientRequest } from "../dto/ListPatientRequestDTO";
import { PatientResponse } from "../dto/PatientResponseDTO";
import { UpdatePatientRequest } from "../dto/UpdatePatientRequestDTO";
import { IObservationRepository } from "../../observation/domain/repository/IObservationRepository";
import { IConsultationRepository } from "../../consultation/domain/repository/IConsultationRepository";
import { ObservationService } from "../../observation/service/ObservationService";
import { ObservationBody } from "../../observation/dto/ObservationBodyDTO";
import { ObservationResponse } from "../../observation/dto/ObservationResponseDTO";

export class PatientService {
  constructor(
    private patientRepository: IPatientRepository,
    private observationRepository: IObservationRepository,
    private consultationRepository: IConsultationRepository,
    private observationService = new ObservationService(observationRepository)
  ) {
  }

  async create(name: string, birthDay: Date, sex: string, cpf: string, ethnicity: string, email: string, observation: ObservationBody | undefined): Promise<PatientResponse> {
    if (!name || !birthDay || !sex || !cpf || !ethnicity) {
      throw new Error("Name, birthday, sex, cpf, and ethnicity are required.");
    }

    const parsedBirthDay = birthDay instanceof Date ? birthDay : new Date(birthDay as any);
    if (isNaN(parsedBirthDay.getTime())) {
      throw new Error('Invalid birthDay. Use a valid Date or ISO-8601 string.');
    }

    const patientExists = await this.patientRepository.findByCPF(cpf);
    if (patientExists) {
      throw new Error("Patient already exists.");
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

  async delete(id: string, cpf: string): Promise<void> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new Error("Patient not exists.");
    }

    if (patient.cpf !== cpf) {
      throw new Error("CPF invalid.");
    }

    const observationExists = await this.observationRepository.findByPatientId(id);

    if (observationExists) {
      await this.observationService.delete(observationExists.id);
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
        throw new Error("Patient not exists.");
      }

      if(id !== patient.id) {
        throw new Error("Patient ID invalid.");
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

      if (observation && observationExists?.patientId === id) {
          updatedObservation = await this.observationService.update(
          observationExists.id,
          observation.comorbidity ?? undefined,
          observation.allergies ?? undefined,
          observation.medications ?? undefined
        );
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
      throw new Error("Patient not exists.");
    }

    if (!userId || !userRole) {
      throw new Error("User authentication required.");
    }

    if (userRole === 'MEDIC') {
      const consultations = await this.consultationRepository.findByPatientAndMedic(patient.id, userId);

      if (consultations.length === 0) {
        throw new Error("Access denied to this patient.");
      }
    }

    const list: ListPatientRequest = { id: patient.id };

    const result = await this.patientRepository.listPatient(list)

    return result;
  }
  
  async listAll(userId:string | undefined, userRole:string | undefined): Promise<PatientResponse[]> {
    if (!userId || !userRole) {
      throw new Error("User authentication required.");
    }

    const patients = await this.patientRepository.listPatients();

    if (userRole === 'MEDIC') {
      const patientIds = patients.map(c => c.id);

      const consultations = await this.consultationRepository.findByPatientsAndMedic(patientIds, userId);
      return this.patientRepository.listPatientsByIds(consultations.map(c => c.patientId));
    }

    return patients;
  }

}
