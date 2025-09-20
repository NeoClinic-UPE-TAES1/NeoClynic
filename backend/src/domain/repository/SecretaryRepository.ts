import { Secretary } from "../entity/Secretary";
import { prisma } from "../../infra/database/prismaClient";
import { ISecretaryRepository } from "./ISecretaryRepository";
import { SecretaryResponse } from "../../dto/SecretaryResponseDTO";
import { CreateSecretaryRequest } from "../../dto/CreateSecretaryRequestDTO";
import { DeleteSecretaryRequest } from "../../dto/DeleteSecretaryRequestDTO";

export class SecretaryRepository implements ISecretaryRepository {
    async createSecretary(createSecretary: CreateSecretaryRequest): Promise<SecretaryResponse> {
        const { name, email, hashedPassword} = createSecretary
        const data = await prisma.secretary.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
        });

        return {
        id: data.id,
        name: data.name,
        email: data.email
        };
    }

    async listSecretary(id:string): Promise<SecretaryResponse>{
        throw new Error("Method not implemented.");
    }

    listSecretaries(): Promise<Secretary[]> {
        throw new Error("Method not implemented.");
    }

    updateSecretary(id: string, name?: string, email?: string, password?: string): Promise<SecretaryResponse> {
        throw new Error("Method not implemented.");
    }

    async deleteSecretary(deleteSecretary:DeleteSecretaryRequest): Promise<void> {
        const {id} = deleteSecretary

        await prisma.secretary.delete({
            where: { id

             }
        });
    }

    async findByEmail(email: string): Promise<Secretary | null> {
        const data = await prisma.secretary.findFirst({
            where: { email

             }
        });
        
        if (!data) return null;

        return data;
    }

    async findById(id: string): Promise<Secretary | null> {
        const data = await prisma.secretary.findFirst({
            where: { id

             }
        });
        
        if (!data) return null;

        return data;
    }
    
}