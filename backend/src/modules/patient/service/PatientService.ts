import { IPatientRepository } from "../domain/repository/IPatientRepository";
import { CreatePatientRequest } from "../dto/CreatePatientRequestDTO";
import { UpdatePatientRequest } from "../dto/UpdatePatientRequestDTO";
import { ListPatientRequest } from "../dto/ListPatientRequestDTO";
import { PatientResponse } from "../dto/PatientResponseDTO";

export class PatientService {
    constructor(private patientRepository: IPatientRepository) {}

    async create(name: string, birthDay: Date, sex: string, cpf: string, ethnicity: string, email?: string): Promise<PatientResponse> {
        if (!name || !birthDay || !sex || !cpf || !ethnicity) {
            throw new Error("Name, birthDay, sex, cpf, and ethnicity are required.");
        }

        const patient = await this.patientRepository.findByCpf(cpf);
        if (patient) {
            throw new Error("Patient with this CPF already exists.");
        }

        const createData: CreatePatientRequest = {
            name,
            birthDay,
            sex,
            cpf,
            ethnicity,
            email
        };

        return await this.patientRepository.createPatient(createData);
    }

    async list(id: string): Promise<PatientResponse> {
        const listRequest: ListPatientRequest = { id };
        return await this.patientRepository.listPatient(listRequest);
    }

    async listAll(): Promise<PatientResponse[]> {
        return await this.patientRepository.listPatients();
    }

    async update(id: string, name: string, birthDay: Date, sex: string, cpf: string, ethnicity: string, email?: string): Promise<PatientResponse> {
        const updateData: UpdatePatientRequest = {
            id,
            name,
            birthDay,
            sex,
            cpf,
            ethnicity,
            email
        };

        return await this.patientRepository.updatePatient(updateData);
    }

    async updateObservation(id: string, comorbidity: string, allergies: string, medications: string): Promise<void> {
        return await this.patientRepository.updateObservation(id, comorbidity, allergies, medications);
    }

    async delete(id: string): Promise<void> {
        return await this.patientRepository.deletePatient(id);
    }
}