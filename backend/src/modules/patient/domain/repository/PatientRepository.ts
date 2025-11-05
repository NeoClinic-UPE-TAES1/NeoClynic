import { Patient } from "../entity/Patient";
import { prisma } from "../../../../infra/database/prismaClient";
import { IPatientRepository } from "./IPatientRepository";
import { PatientResponse } from "../../dto/PatientResponseDTO";
import { CreatePatientRequest } from "../../dto/CreatePatientRequestDTO";
import { UpdatePatientRequest } from "../../dto/UpdatePatientRequestDTO";
import { ListPatientRequest } from "../../dto/ListPatientRequestDTO";

export class PatientRepository implements IPatientRepository {
    async createPatient(createPatient: CreatePatientRequest): Promise<PatientResponse> {
        const { name, birthDay, sex, cpf, ethnicity, email, observation } = createPatient;
        const data = await prisma.patient.create({
            data: {
                name,
                birthDay,
                sex,
                cpf,
                ethnicity,
                email,
                observation: observation ? {
                    create: observation
                } : undefined
            },
            include: { observation: true }
        });

        return {
            id: data.id,
            name: data.name,
            birthDay: data.birthDay,
            sex: data.sex,
            cpf: data.cpf,
            ethnicity: data.ethnicity,
            email: data.email,
            observation: data.observation ? {
                comorbidity: data.observation.comorbidity,
                allergies: data.observation.allergies,
                medications: data.observation.medications
            } : null
        };
    }

    async listPatient(listPatient: ListPatientRequest): Promise<PatientResponse> {
        const { id } = listPatient;

        const data = await prisma.patient.findUnique({
            where: { id },
            include: { observation: true }
        });

        if (!data) {
            throw new Error(`Paciente com id ${id} não encontrado.`);
        }

        return {
            id: data.id,
            name: data.name,
            birthDay: data.birthDay,
            sex: data.sex,
            cpf: data.cpf,
            ethnicity: data.ethnicity,
            email: data.email,
            observation: data.observation ? {
                comorbidity: data.observation.comorbidity,
                allergies: data.observation.allergies,
                medications: data.observation.medications
            } : null
        };
    }

    async listPatients(): Promise<PatientResponse[]> {
        const patients = await prisma.patient.findMany({
            include: { observation: true }
        });

        return patients.map((p) => ({
            id: p.id,
            name: p.name,
            birthDay: p.birthDay,
            sex: p.sex,
            cpf: p.cpf,
            ethnicity: p.ethnicity,
            email: p.email,
            observation: p.observation ? {
                comorbidity: p.observation.comorbidity,
                allergies: p.observation.allergies,
                medications: p.observation.medications
            } : null
        }));
    }

    async updatePatient(updatePatient: UpdatePatientRequest): Promise<PatientResponse> {
        const { id, name, birthDay, sex, cpf, ethnicity, email } = updatePatient;

        const data = await prisma.patient.update({
            where: { id },
            data: {
                name,
                birthDay,
                sex,
                cpf,
                ethnicity,
                email
            },
            include: { observation: true }
        });

        return {
            id: data.id,
            name: data.name,
            birthDay: data.birthDay,
            sex: data.sex,
            cpf: data.cpf,
            ethnicity: data.ethnicity,
            email: data.email,
            observation: data.observation ? {
                comorbidity: data.observation.comorbidity,
                allergies: data.observation.allergies,
                medications: data.observation.medications
            } : null
        };
    }

    async updateObservation(id: string, comorbidity: string, allergies: string, medications: string): Promise<void> {
        await prisma.observation.upsert({
            where: { patientId: id },
            update: {
                comorbidity,
                allergies,
                medications
            },
            create: {
                patientId: id,
                comorbidity,
                allergies,
                medications
            }
        });
    }

    async deletePatient(id: string): Promise<void> {
        await prisma.patient.delete({
            where: { id }
        });
    }

    async findByCpf(cpf: string): Promise<PatientResponse | null> {
        const data = await prisma.patient.findUnique({
            where: { cpf },
            include: { observation: true }
        });

        if (!data) {
            return null;
        }

        return {
            id: data.id,
            name: data.name,
            birthDay: data.birthDay,
            sex: data.sex,
            cpf: data.cpf,
            ethnicity: data.ethnicity,
            email: data.email,
            observation: data.observation ? {
                comorbidity: data.observation.comorbidity,
                allergies: data.observation.allergies,
                medications: data.observation.medications
            } : null
        };
    }
}