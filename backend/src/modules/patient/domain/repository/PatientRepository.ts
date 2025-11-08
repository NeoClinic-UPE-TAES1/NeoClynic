import { Patient } from "../entity/Patient";
import { prisma } from "../../../../infra/database/prismaClient";
import { IPatientRepository } from "./IPatientRepository";
import { PatientResponse } from "../../dto/PatientResponseDTO";
import { CreatePatientRequest } from "../../dto/CreatePatientRequestDTO";
import { DeletePatientRequest } from "../../dto/DeletePatientRequestDTO";
import { UpdatePatientRequest } from "../../dto/UpdatePatientRequestDTO";
import { ListPatientRequest } from "../../dto/ListPatientRequestDTO";

export class PatientRepository implements IPatientRepository {
  async createPatient(createPatient: CreatePatientRequest): Promise<PatientResponse> {
    const { name, birthDay, sex, cpf, ethnicity, email} = createPatient;

    const data = await prisma.patient.create({
      data: {
        name,
        birthDay,
        sex,
        cpf,
        ethnicity,
        email
    }
});

    return {
      id: data.id,
      birthDay: data.birthDay,
      sex: data.sex,
      cpf: data.cpf,
      ethnicity: data.ethnicity,
      name: data.name,
      email: data.email ?? undefined
    };
  }

  async listPatient(listPatient: ListPatientRequest): Promise<PatientResponse> {
    const { id } = listPatient;

    const data = await prisma.patient.findUnique({
      where: { id },
      include: { 
         observation: true,
         consultation: true},
    });

    if (!data) {
      throw new Error(`Patient id not found: ${id}`);
    }

    return {
      id: data.id,
      birthDay: data.birthDay,
      sex: data.sex,
      cpf: data.cpf,
      ethnicity: data.ethnicity,
      name: data.name,
      email: data.email ?? undefined,
      observation: data.observation ?? undefined,
      consultation: data.consultation ?? undefined
    };
  }

  async listPatients(page:number|undefined, limit:number|undefined): Promise<PatientResponse[]> {
    const patients = await prisma.patient.findMany({
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit,
      include: { 
         observation: true,
         consultation: true},
    });

    return patients.map((m) => ({
      id: m.id,
      birthDay: m.birthDay,
      sex: m.sex,
      cpf: m.cpf,
      ethnicity: m.ethnicity,
      name: m.name,
      email: m.email ?? undefined,
      observations: m.observation ?? undefined,
      consultation: m.consultation ?? undefined
    }));
  }

  async updatePatient(updatePatient: UpdatePatientRequest): Promise<PatientResponse> {
    const { id, name, birthDay, sex, cpf, ethnicity, email } = updatePatient;

    const data = await prisma.patient.update({
      where: { id },
      data: {
      ...(name && { name }),
      ...(birthDay && { birthDay }),
      ...(sex && { sex }),
      ...(cpf && { cpf }),
      ...(ethnicity && { ethnicity }),
      ...(email && { email }),
      
      }
    });

    return {
      id: data.id,
      name: data.name,
      birthDay: data.birthDay,
      sex: data.sex,
      cpf: data.cpf,
      ethnicity: data.ethnicity,
      email: data.email ?? undefined,
    
    };
  }

  async deletePatient(deletePatient: DeletePatientRequest): Promise<void> {
    const { id } = deletePatient;

    await prisma.patient.delete({ where: { id } });
  }

  async findByCPF(cpf: string): Promise<Patient | null> {
    return await prisma.patient.findFirst({ where: { cpf } });
  }

  async findById(id: string): Promise<Patient | null> {
    return await prisma.patient.findFirst({ where: { id } });
  }

  async listPatientByMedic(id:string, medicId: string): Promise<PatientResponse | null> {
    const patients = await prisma.patient.findFirst({
      where: {
        consultation: {
          some: { medicId },
        },
      },
      include: {
        consultation: {
          where: { patientId: id, medicId },
          select: { id: true, medicId: true, patientId: true, date: true, hasFollowUp: true },
        },
      },
      orderBy: { name: "asc" },
    });

    if (!patients) {
      return null;
    }

    return {
      id: patients.id,
      birthDay: patients.birthDay,
      sex: patients.sex,
      cpf: patients.cpf,
      ethnicity: patients.ethnicity,
      name: patients.name,
      email: patients.email ?? undefined,
      consultation: patients.consultation ?? undefined,
    };
  }

  async listPatientsByMedic(medicId: string, page?: number, limit?: number): Promise<PatientResponse[]> {
    const patients = await prisma.patient.findMany({
      where: {
        consultation: {
          some: { medicId },
        },
      },
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit,
      include: {
        consultation: {
          where: { medicId },
          select: { id: true, medicId: true, patientId: true, date: true, hasFollowUp: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return patients.map((m) => ({
      id: m.id,
      birthDay: m.birthDay,
      sex: m.sex,
      cpf: m.cpf,
      ethnicity: m.ethnicity,
      name: m.name,
      email: m.email ?? undefined,
      consultation: m.consultation ?? undefined,
    }));
  }
}