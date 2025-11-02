import { IObservationRepository } from "./IObservationRepository";
import { CreateObservationRequest } from "../../dto/CreateObservationRequestDTO";
import { ObservationResponse } from "../../dto/ObservationResponseDTO";
import { ListObservationRequest } from "../../dto/ListObservationRequestDTO";
import { UpdateObservationRequest } from "../../dto/UpdateObservationRequestDTO";
import { DeleteObservationRequest } from "../../dto/DeleteObservationRequestDTO";
import { Observation } from "../entity/Observation";
import { prisma } from "../../../../infra/database/prismaClient";

export class ObservationRepository implements IObservationRepository {

    async createObservation(createObservation: CreateObservationRequest): Promise<ObservationResponse>{
        const { comorbidity, allergies, medications, patientId } = createObservation;

        const data = await prisma.observation.create({
        data: {
            comorbidity,
            allergies,
            medications,
            patientId
        }});

        return {
            id: data.id,
            comorbidity: data.comorbidity ?? '',
            allergies: data.allergies ?? '',
            medications: data.medications ?? '',
            patientId: data.patientId
        };
    }

    async listObservation(listObservation:ListObservationRequest): Promise<ObservationResponse>{
        const { id } = listObservation;

        const data = await prisma.observation.findUnique({
            where: { id },
        });

        if (!data) {
            throw new Error(`Observation id not found: ${id}`);
        }

        return {
            id: data.id,
            comorbidity: data.comorbidity ?? '',
            allergies: data.allergies ?? '',
            medications: data.medications ?? '',
            patientId: data.patientId
        };
    }
    
    async updateObservation(updateObservation: UpdateObservationRequest): Promise<ObservationResponse>{
        const { id, comorbidity, allergies, medications } = updateObservation;

        const data = await prisma.observation.update({
            where: { id },
            data: {
                ...(comorbidity !== undefined && comorbidity !== "" && { comorbidity }),
                ...(allergies !== undefined && allergies !== "" && { allergies }),
                ...(medications !== undefined && medications !== "" && { medications })
            }
        });

        return {
            id: data.id,
            comorbidity: data.comorbidity ?? undefined,
            medications: data.medications ?? undefined,
            allergies: data.allergies ?? undefined,
            patientId: data.patientId
        };
    }
    
    async deleteObservation(deleteObservation:DeleteObservationRequest): Promise<void>{
        const {id} = deleteObservation;

        await prisma.observation.delete({
            where: { id }
        });
    }
    
    async findById(id: string): Promise<Observation | null>{
        return await prisma.observation.findFirst({ where: { id } });
    }

    async findByPatientId(patientId: string): Promise<Observation | null>{
        return await prisma.observation.findFirst({ where: { patientId } });
    }
    
}