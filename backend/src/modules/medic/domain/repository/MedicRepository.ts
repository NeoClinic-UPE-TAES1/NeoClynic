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
        password: hashedPassword,
      //   consultations: {
      //   connect: [{ id: consultationId1 }, { id: consultationId2 }]
      // }
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
      throw new Error(`Médico com id ${id} não encontrado.`);
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

  async findByEmail(email: string): Promise<Medic | null> {
    return await prisma.medic.findFirst({ where: { email } });
  }

  async findById(id: string): Promise<Medic | null> {
    return await prisma.medic.findFirst({ where: { id } });
  }
}
