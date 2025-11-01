import { prisma } from "../../../../infra/database/prismaClient";
import { Report } from '../entity/Report';
import { IReportRepository } from './IReportRepository';
import { CreateReportRequest } from '../../dto/CreateReportRequestDTO';
import { ReportResponse } from '../../dto/ReportResponseDTO';
import { DeleteReportRequest } from '../../dto/DeleteReportRequestDTO';
import { UpdateReportRequest } from '../../dto/UpdateReportRequestDTO';
import { ListReportRequest } from '../../dto/ListReportRequestDTO';

export class ReportRepository implements IReportRepository{
    async create(createReport: CreateReportRequest): Promise<ReportResponse> {
        const { description, diagnosis, prescription, consultationId } = createReport;
        
        const data = await prisma.report.create({
        data: {
            description,
            diagnosis,
            prescription: prescription ?? '',
            consultationId,
        }
        });

        return {
            id: data.id,
            description: data.description,
            diagnosis: data.diagnosis,
            prescription: data.prescription ?? undefined,
            consultationId: data.consultationId,
        };
    }

    async delete(data: DeleteReportRequest): Promise<void> {
        await prisma.report.delete({
            where: { id: data.id }
        });
    }
    
    async update(data: UpdateReportRequest): Promise<ReportResponse> {
        const report = await prisma.report.update({
            where: { id: data.id },
            data: {
                description: data.description,
                diagnosis: data.diagnosis,
                prescription: data.prescription,
            }
        });
        
        return {
            id: report.id,
            description: report.description,
            diagnosis: report.diagnosis,
            prescription: report.prescription ?? undefined,
            consultationId: report.consultationId
        }
    }

    async listReport(listReportRequest:ListReportRequest):Promise<ReportResponse>{
        const { id } = listReportRequest;

        const data = await prisma.report.findUnique({
            where: { id },
        });

        if (!data) {
            throw new Error('Report not found');
        }

        return {
            id: data.id,
            description: data.description,
            diagnosis: data.diagnosis,
            prescription: data.prescription ?? undefined,
            consultationId: data.consultationId,
        };
    }

    async findById(id: string): Promise<Report | null> {
            return await prisma.report.findFirst({ where: { id } });
          }

    async findByConsultationId(consultationId: string): Promise<Report | null>{
        return await prisma.report.findFirst({ where: { consultationId } });
    }
}