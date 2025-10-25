import { IConsultationRepository } from '../domain/repository/IConsultationRepository';
import { IReportRepository } from '../../report/domain/repository/IReportRepository';
import { ConsultationResponse } from '../dto/ConsultationResponseDTO';
import { CreateConsultationRequest } from '../dto/CreateConsultationRequestDTO';
import { ListConsultationRequest } from '../dto/ListConsultationRequestDTO';
import { DeleteConsultationRequest } from '../dto/DeleteConsultationRequestDTO';
import { UpdateConsultationRequest } from '../dto/UpdateConsultationRequestDTO';
import { ReportBodyDTO } from '../../report/dto/ReportBodyDTO';
import { ReportService } from '../../report/service/ReportService';

export class ConsultationService {
    constructor(
        private consultationRepository: IConsultationRepository,
        private reportRepository: IReportRepository,
        private reportService =  new ReportService(reportRepository)
    ) { }

    public async create(date: Date, hasFollowUp: boolean, medicId: string, patientId: string, report: ReportBodyDTO) : Promise<ConsultationResponse> {

        if (!date || !hasFollowUp || !medicId || !patientId) {
            throw new Error("Missing required fields");
        }

        const createConsultation:CreateConsultationRequest = {
            date,
            hasFollowUp,
            medicId,
            patientId
        };

        const consultation = await this.consultationRepository.createConsultation(createConsultation);

        if (report) {
            const createdReport = await this.reportService.create(
                report.description,
                report.diagnosis,
                report.prescription ?? '',
                consultation.id
            );

            consultation.report = {
                id: createdReport.id,
                description: createdReport.description,
                diagnosis: createdReport.diagnosis,
                prescription: createdReport.prescription ?? '',
                consultationId: consultation.id
            };
        }

        return consultation;
    }
    

    public async delete(id: string) : Promise<void> {
        const consultation = await this.consultationRepository.findById(id);
        if (!consultation) {
            throw new Error("Consultation not exists.");
        }
        
        const deleteConsultation: DeleteConsultationRequest = { id: consultation.id };

        const report = await this.reportRepository.findByConsultationId(consultation.id);
        if (report){
            await this.reportService.delete(report.id);
        }

        return await this.consultationRepository.deleteConsultation(deleteConsultation);
    }

    public async update(id:string, date: Date, hasFollowUp: boolean, medicId: string, patiendId: string, report: ReportBodyDTO) : Promise<ConsultationResponse>{
        const consultation = await this.consultationRepository.findById(id);
        if (!consultation) {
            throw new Error("Consultation not exists.");
        }

        const updateRequest: UpdateConsultationRequest = { 
            id: consultation.id,
            date,
            hasFollowUp
        };

        const updatedConsultation = await this.consultationRepository.updateConsultation(updateRequest);

        if (report) {
            const existingReport = await this.reportRepository.findByConsultationId(consultation.id);

            if (existingReport) {
                const newReport = await this.reportService.update(
                    existingReport.id,
                    report.description,
                    report.diagnosis,
                    report.prescription ?? ''
                );

                updatedConsultation.report = {
                    id: newReport.id,
                    description: newReport.description,
                    diagnosis: newReport.diagnosis,
                    prescription: newReport.prescription ?? '',
                    consultationId: updatedConsultation.id
                };
            }
        }

        return await this.consultationRepository.updateConsultation(updateRequest);
    }

    public async listOne(id:string) : Promise<ConsultationResponse>{
        const consultation = await this.consultationRepository.findById(id);
            if (!consultation) {
              throw new Error("Consultation not exists.");
            }
        
            const list: ListConsultationRequest = { id: consultation.id };
            return await this.consultationRepository.listConsultation(list);
    }

    public async listAll() : Promise<ConsultationResponse[]> {
        return await this.consultationRepository.listConsultations();
    }
}
