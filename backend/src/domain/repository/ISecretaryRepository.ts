import { SecretaryResponse } from "../../dto/SecretaryResponseDTO";
import { CreateSecretaryRequest } from "../../dto/CreateSecretaryRequestDTO";
import type { Secretary } from "../entity/Secretary";
import { DeleteSecretaryRequest } from "../../dto/DeleteSecretaryRequestDTO";
import { UpdateSecretaryRequest } from "../../dto/UpdateSecretaryRequestDTO";
import { ListSecretaryRequest } from "../../dto/ListSecretaryRequestDTO";
 
export interface ISecretaryRepository {
    createSecretary(createSecretary: CreateSecretaryRequest): Promise<SecretaryResponse>;
    listSecretary(ListSecretary:ListSecretaryRequest): Promise<SecretaryResponse>;
    listSecretaries(): Promise<SecretaryResponse[]>;
    updateSecretary(updateSecretary: UpdateSecretaryRequest): Promise<SecretaryResponse>;
    deleteSecretary(deleteSecretary:DeleteSecretaryRequest): Promise<void>;
    
    findByEmail(email: string): Promise<Secretary | null>;
    findById(id: string): Promise<Secretary | null>;
}