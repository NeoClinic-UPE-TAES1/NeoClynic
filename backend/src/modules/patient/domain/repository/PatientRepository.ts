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

  async listPatients(): Promise<PatientResponse[]> {
    const patients = await prisma.patient.findMany({
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

}

    