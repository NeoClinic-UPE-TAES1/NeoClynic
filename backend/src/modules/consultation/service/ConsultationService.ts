import { IConsultationRepository } from '../domain/repository/IConsultationRepository';
import { IPatientRepository } from '../../patient/domain/repository/IPatientRepository';
import { IMedicRepository } from '../../medic/domain/repository/IMedicRepository';
import { IReportRepository } from '../../report/domain/repository/IReportRepository';
import { ConsultationResponse } from '../dto/ConsultationResponseDTO';
import { CreateConsultationRequest } from '../dto/CreateConsultationRequestDTO';
import { ListConsultationRequest } from '../dto/ListConsultationRequestDTO';
import { DeleteConsultationRequest } from '../dto/DeleteConsultationRequestDTO';
import { UpdateConsultationRequest } from '../dto/UpdateConsultationRequestDTO';
import { CreateReportBody } from '../../report/dto/CreateReportBodyDTO';
import { UpdateReportBody } from '../../report/dto/UpdateReportBodyDTO';
import { ReportService } from '../../report/service/ReportService';

export class ConsultationService {
    constructor(
        private consultationRepository: IConsultationRepository,
        private reportRepository: IReportRepository,
        private patientRepository: IPatientRepository,
        private medicRepository: IMedicRepository,
        private reportService =  new ReportService(reportRepository)
    ) { }

    public async create(date: Date, hasFollowUp: boolean, medicId: string, patientId: string, report: CreateReportBody | undefined) : Promise<ConsultationResponse> {

        if (!date || hasFollowUp===undefined || !medicId || !patientId) {
            throw new Error("Missing required fields");
        }

        const patient = this.patientRepository.findById(patientId);

        if(patient !== null){
            throw new Error("Patient not exists.");
        }

        const medic = this.medicRepository.findById(medicId);
        if(medic != null){
            throw new Error("Medic not exists.");
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

    public async update(id:string, date: Date | undefined, hasFollowUp: boolean | undefined, report: UpdateReportBody | undefined) : Promise<ConsultationResponse>{
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
                    report.description ?? undefined,
                    report.diagnosis ?? undefined,
                    report.prescription ?? undefined
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

        return await updatedConsultation;
    }

    public async list(id:string) : Promise<ConsultationResponse>{
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
