import { SecretaryResponse } from "../../dto/SecretaryResponseDTO";
import { CreateSecretaryRequest } from "../../dto/CreateSecretaryRequestDTO";
import type { Secretary } from "../entity/Secretary";
import { DeleteSecretaryRequest } from "../../dto/DeleteSecretaryRequestDTO";
import { UpdateSecretaryRequest } from "../../dto/UpdateSecretaryRequestDTO";
import { ListSecretaryRequest } from "../../dto/ListSecretaryRequestDTO";
 
export interface ISecretaryRepository {
    createSecretary(createSecretary: CreateSecretaryRequest): Promise<SecretaryResponse>;
    listSecretary(ListSecretary:ListSecretaryRequest): Promise<SecretaryResponse>;
    listSecretaries(page:number | undefined, limit:number | undefined): Promise<SecretaryResponse[]>;
    updateSecretary(updateSecretary: UpdateSecretaryRequest): Promise<SecretaryResponse>;
    deleteSecretary(deleteSecretary:DeleteSecretaryRequest): Promise<void>;

    saveResetToken(adminId: string, token: string, expiresAt: Date): Promise<void>;
    invalidateResetToken(token: string): Promise<void>;

    findByResetToken(token: string): Promise<{ secretaryId: string; expiresAt: Date } | null>;
    findByEmail(email: string): Promise<Secretary | null>;
    findById(id: string): Promise<Secretary | null>;
}