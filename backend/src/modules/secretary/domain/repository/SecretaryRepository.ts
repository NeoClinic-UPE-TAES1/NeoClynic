import { Secretary } from "../entity/Secretary";
import { prisma } from "../../../../infra/database/prismaClient";
import { ISecretaryRepository } from "./ISecretaryRepository";
import { SecretaryResponse } from "../../dto/SecretaryResponseDTO";
import { CreateSecretaryRequest } from "../../dto/CreateSecretaryRequestDTO";
import { DeleteSecretaryRequest } from "../../dto/DeleteSecretaryRequestDTO";
import { UpdateSecretaryRequest } from "../../dto/UpdateSecretaryRequestDTO";
import { ListSecretaryRequest } from "../../dto/ListSecretaryRequestDTO";

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

    async listSecretary(listSecretary: ListSecretaryRequest): Promise<SecretaryResponse> {
        const { id } = listSecretary;

        const data = await prisma.secretary.findUnique({
            where: { id },
        });

        if (!data) {
            throw new Error(`Secretary id not found: ${id}`);
        }

        return {
            id: data.id,
            name: data.name,
            email: data.email,
        };
    }


    async listSecretaries(page:number | undefined, limit:number | undefined): Promise<SecretaryResponse[]> {
        const secretaries = await prisma.secretary.findMany({
            skip: page && limit ? (page - 1) * limit : undefined,
            take: limit
        });

        return secretaries.map((s: { id: string; name: string; email: string; }) => ({
            id: s.id,
            name: s.name,
            email: s.email,
        }));
    }

    async updateSecretary(updateSecretary: UpdateSecretaryRequest): Promise<SecretaryResponse> {
        const { id, name, email, password } = updateSecretary;

        const data = await prisma.secretary.update({
            where: { id },
            data: {
                ...(name !== undefined && name !== "" && { name }),
                ...(email !== undefined && email !== "" && { email }),
                ...(password !== undefined && password !== "" && { password })
            }
        });

        return {
            id: data.id,
            name: data.name,
            email: data.email
        };
    }

    async deleteSecretary(deleteSecretary:DeleteSecretaryRequest): Promise<void> {
        const {id} = deleteSecretary

        await prisma.secretary.delete({
            where: { id

             }
        });
    }

    async saveResetToken(secretaryId: string, token: string, expiresAt: Date): Promise<void> {
    await prisma.secretary.update({
      where: { id: secretaryId },
      data: {
        resetToken: token,
        resetTokenExpiresAt: expiresAt
      }
    });
  }

  async invalidateResetToken(token: string): Promise<void> {
    await prisma.secretary.update({
      where: { resetToken: token },
      data: {
        resetToken: null,
        resetTokenExpiresAt: null
      }
    });
  }

  async findByResetToken(token: string): Promise<{ secretaryId: string; expiresAt: Date } | null> {
    const secretary = await prisma.secretary.findFirst({
      where: { resetToken: token }
    });

    if (!secretary) return null;
  
    return { secretaryId: secretary.id, expiresAt: secretary.resetTokenExpiresAt! };
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