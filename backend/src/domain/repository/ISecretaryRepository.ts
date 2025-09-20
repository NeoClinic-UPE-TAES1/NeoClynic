import { SecretaryResponse } from "../../dto/SecretaryResponseDTO";
import { CreateSecretaryRequest } from "../../dto/CreateSecretaryRequestDTO";
import type { Secretary } from "../entity/Secretary";
import { DeleteSecretaryRequest } from "../../dto/DeleteSecretaryRequestDTO";

export interface ISecretaryRepository {
    createSecretary(createSecretary: CreateSecretaryRequest): Promise<SecretaryResponse>;
    listSecretary(id:string): Promise<SecretaryResponse>;
    listSecretaries(): Promise<SecretaryResponse[]>;
    updateSecretary(name?: string, email?: string, password?: string): Promise<SecretaryResponse>;
    deleteSecretary(deleteSecretary:DeleteSecretaryRequest): Promise<void>;
    
    findByEmail(email: string): Promise<Secretary | null>;
    findById(id: string): Promise<Secretary | null>;
}