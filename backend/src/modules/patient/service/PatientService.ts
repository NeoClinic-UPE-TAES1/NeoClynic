import { Consultation, Observation } from "../../../infra/database/client";
import { IPatientRepository } from "../domain/repository/IPatientRepository";
import { CreatePatientRequest } from "../dto/CreatePatientRequestDTO";
import { DeletePatientRequest } from "../dto/DeletePatientRequestDTO";
import { ListPatientRequest } from "../dto/ListPatientRequestDTO";
import { PatientResponse } from "../dto/PatientResponseDTO";
import { UpdatePatientRequest } from "../dto/UpdatePatientRequestDTO";
import { IObservationRepository } from "../../observation/domain/repository/IObservationRepository";
import { ObservationService } from "../../observation/service/ObservationService";

export class PatientService {
  constructor(
    private patientRepository: IPatientRepository,
    private observationRepository: IObservationRepository,
    private observationService = new ObservationService(observationRepository)
  ) {
  }

  async create(name: string, birthDay: Date, sex: string, cpf: string, ethnicity: string, email: string, observation: Observation): Promise<PatientResponse> {
    if (!name || !birthDay || !sex || !cpf || !ethnicity) {
      throw new Error("Name, birthday, sex, cpf, and ethnicity are required.");
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
      patient.observation = await this.observationService.create(
        observation.comorbidity,
        observation.allergies,
        observation.medications,
        observation.patientId
      );
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
    observation: Observation | undefined
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

      if (observationExists?.patientId === id ) {
          await this.observationService.update(
            observationExists.id,
            observationExists.comorbidity,
            observationExists.allergies,
            observationExists.medications,
            observationExists.patientId
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
        observation: observationExists ? observationExists : undefined
      };

      return result;
    }
  
  async listOne(id: string): Promise<PatientResponse> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new Error("Patient not exists.");
    }

    const observation = await this.observationRepository.findByPatientId(id);

    const list: ListPatientRequest = { id: patient.id };

    const listedPatient = await this.patientRepository.listPatient(list)

    const result: PatientResponse = {
      id: listedPatient.id,
      name: listedPatient.name,
      birthDay: listedPatient.birthDay,
      sex: listedPatient.sex,
      cpf: listedPatient.cpf,
      ethnicity: listedPatient.ethnicity,
      email: listedPatient.email,
      observation: observation ? observation : undefined};

    return result;
  }
  
  async listAll(): Promise<PatientResponse[]> {
    const patients = await this.patientRepository.listPatients();

    for (const patient of patients) {
      const observation = await this.observationRepository.findByPatientId(patient.id);
      patient.observation = observation ? observation : undefined;
    }

    return patients.map((m) => ({
      id: m.id,
      name: m.name,
      birthDay: m.birthDay,
      sex: m.sex,
      cpf: m.cpf,
      ethnicity: m.ethnicity,
      email: m.email ?? undefined,
      observation: m.observation ? m.observation : undefined
    }));
  }

}
