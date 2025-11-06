import { Medic } from "../entity/Medic";
import { prisma } from "../../../../infra/database/prismaClient";
import { IMedicRepository } from "./IMedicRepository";
import { MedicResponse } from "../../dto/MedicResponseDTO";
import { CreateMedicRequest } from "../../dto/CreateMedicRequestDTO";
import { DeleteMedicRequest } from "../../dto/DeleteMedicRequestDTO";
import { UpdateMedicRequest } from "../../dto/UpdateMedicRequestDTO";
import { ListMedicRequest } from "../../dto/ListMedicRequestDTO";

export class MedicRepository implements IMedicRepository {
  async createMedic(createMedic: CreateMedicRequest): Promise<MedicResponse> {
    const { name, email, specialty, hashedPassword } = createMedic;

    const data = await prisma.medic.create({
      data: {
        name,
        email,
        specialty,
        password: hashedPassword
    },
    include: { consultation: true },
  });

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      specialty: data.specialty,
      consultation: data.consultation,
    };
  }

  async listMedic(listMedic: ListMedicRequest): Promise<MedicResponse> {
    const { id } = listMedic;

    const data = await prisma.medic.findUnique({
      where: { id },
      include: { consultation: true },
    });

    if (!data) {
      throw new Error(`Medic not found with id: ${id}`);
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      specialty: data.specialty,
      consultation: data.consultation,
    };
  }

  async listMedics(): Promise<MedicResponse[]> {
    const medics = await prisma.medic.findMany({
      include: { consultation: true },
    });

    return medics.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      specialty: m.specialty,
      consultation: m.consultation,
    }));
  }

  async updateMedic(updateMedic: UpdateMedicRequest): Promise<MedicResponse> {
    const { id, name, email, password, specialty } = updateMedic;

    const data = await prisma.medic.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(specialty && { specialty }),
        ...(password && { password }),
      },
      include: { consultation: true },
    });

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      specialty: data.specialty,
      consultation: data.consultation,
    };
  }

  async deleteMedic(deleteMedic: DeleteMedicRequest): Promise<void> {
    const { id } = deleteMedic;

    await prisma.medic.delete({ where: { id } });
  }

  async saveResetToken(medicId: string, token: string, expiresAt: Date): Promise<void> {
    await prisma.medic.update({
      where: { id: medicId },
      data: {
        resetToken: token,
        resetTokenExpiresAt: expiresAt
      }
    });
  }

  async invalidateResetToken(token: string): Promise<void> {
    await prisma.medic.update({
      where: { resetToken: token },
      data: {
        resetToken: null,
        resetTokenExpiresAt: null
      }
    });
  }

  async findByResetToken(token: string): Promise<{ medicId: string; expiresAt: Date } | null> {
    const medic = await prisma.medic.findFirst({
      where: { resetToken: token }
    });

    if (!medic) return null;
  
    return { medicId: medic.id, expiresAt: medic.resetTokenExpiresAt! };
  }

  async findByEmail(email: string): Promise<Medic | null> {
    return await prisma.medic.findFirst({ where: { email } });
  }

  async findById(id: string): Promise<Medic | null> {
    return await prisma.medic.findFirst({ where: { id } });
  }
}
