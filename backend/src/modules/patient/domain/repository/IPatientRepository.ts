import { PatientResponse } from "../../dto/PatientResponseDTO";
import { CreatePatientRequest } from "../../dto/CreatePatientRequestDTO";
import { UpdatePatientRequest } from "../../dto/UpdatePatientRequestDTO";
import { ListPatientRequest } from "../../dto/ListPatientRequestDTO";

export interface IPatientRepository {
    createPatient(createPatient: CreatePatientRequest): Promise<PatientResponse>;
    listPatient(listPatient: ListPatientRequest): Promise<PatientResponse>;
    listPatients(): Promise<PatientResponse[]>;
    updatePatient(updatePatient: UpdatePatientRequest): Promise<PatientResponse>;
    updateObservation(id: string, comorbidity: string, allergies: string, medications: string): Promise<void>;
    deletePatient(id: string): Promise<void>;
    findByCpf(cpf: string): Promise<PatientResponse | null>;
}