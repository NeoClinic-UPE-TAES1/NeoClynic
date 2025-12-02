import { PatientResponse } from "../../dto/PatientResponseDTO";
import { CreatePatientRequest } from "../../dto/CreatePatientRequestDTO";
import type { Patient } from "../entity/Patient";
import { DeletePatientRequest } from "../../dto/DeletePatientRequestDTO";
import { UpdatePatientRequest } from "../../dto/UpdatePatientRequestDTO";
import { ListPatientRequest } from "../../dto/ListPatientRequestDTO";
 
export interface IPatientRepository {
    createPatient(createPatient: CreatePatientRequest): Promise<PatientResponse>;
    listPatient(ListPatient:ListPatientRequest): Promise<PatientResponse>;
    listPatients(page:number|undefined, limit:number|undefined): Promise<PatientResponse[]>;
    updatePatient(updatePatient: UpdatePatientRequest): Promise<PatientResponse>;
    deletePatient(deletePatient:DeletePatientRequest): Promise<void>;
    
    findByCPF(cpf: string): Promise<Patient | null>;
    findById(id: string): Promise<Patient | null>;
    listPatientsByMedic(medicId: string, page?: number, limit?: number): Promise<PatientResponse[]>;
    listPatientByMedic(id:string, medicId: string): Promise<PatientResponse | null>;
}