import { prisma } from "../../../../infra/database/prismaClient";
import { Consultation } from '../entity/Consultation';
import { IConsultationRepository } from './IConsultationRepository';
import { CreateConsultationRequest } from '../../dto/CreateConsultationRequestDTO';
import { ConsultationResponse } from '../../dto/ConsultationResponseDTO';
import { DeleteConsultationRequest } from '../../dto/DeleteConsultationRequestDTO';
import { UpdateConsultationRequest } from '../../dto/UpdateConsultationRequestDTO';
import { ListConsultationRequest } from '../../dto/ListConsultationRequestDTO';

export class ConsultationRepository implements IConsultationRepository{
    async createConsultation(createConsultationRequest:CreateConsultationRequest):Promise<ConsultationResponse>{
        const { date, hasFollowUp, medicId, patientId } = createConsultationRequest;
        
        const data = await prisma.consultation.create({
        data: {
            date,
            hasFollowUp,
            medic: { connect: { id: medicId } },
            patient: { connect: { id: patientId } },
            }
        });

        return {
        id: data.id,
        date: data.date,
        hasFollowUp: data.hasFollowUp,
        medicId: data.medicId,
        patientId: data.patientId,
        };
        
    }

    async deleteConsultation(deleteConsultation: DeleteConsultationRequest): Promise<void> {
        const { id } = deleteConsultation;
        
        await prisma.consultation.delete({ where: { id } });
    }

    async updateConsultation(updateConsultationRequest:UpdateConsultationRequest):Promise<ConsultationResponse>{
        const { id, date, hasFollowUp } = updateConsultationRequest;

        const data = await prisma.consultation.update({
        where: { id },
        data: {
        ...(date !== undefined && { date }),
        ...(hasFollowUp !== undefined && { hasFollowUp })
        
        }
        });

        return {
        id: data.id,
        date: data.date,
        hasFollowUp: data.hasFollowUp,
        medicId: data.medicId,
        patientId: data.patientId,
        
        };
  }

    async listConsultation(listConsultationRequest:ListConsultationRequest):Promise<ConsultationResponse>{
        const { id } = listConsultationRequest;

        const data = await prisma.consultation.findUnique({
            where: { id },
            include: { report: true },
        });

        if (!data) {
        throw new Error(`Consultation id not found: ${id}`);
        }

        return {
        id: data.id,
        date: data.date,
        hasFollowUp: data.hasFollowUp,
        medicId: data.medicId,
        patientId: data.patientId,
        report: data.report ? {
            id: data.report.id,
            description: data.report.description,
            diagnosis: data.report.diagnosis,
            prescription: data.report.prescription ?? '',
            consultationId: data.report.consultationId
        } : undefined
        };
    }
    
    async listConsultations():Promise<ConsultationResponse[]>{
        const consultations = await prisma.consultation.findMany({
            include: { report: true },
        });

        return consultations.map((c) => ({
        id: c.id,
        date: c.date,
        hasFollowUp: c.hasFollowUp,
        medicId: c.medicId,
        patientId: c.patientId,
        report: c.report ? {
            id: c.report.id,
            description: c.report.description,
            diagnosis: c.report.diagnosis,
            prescription: c.report.prescription ?? '',
            consultationId: c.report.consultationId
        } : undefined
        }));
    }

    async findById(id: string): Promise<Consultation | null> {
        return await prisma.consultation.findFirst({ where: { id }});
      }
} 