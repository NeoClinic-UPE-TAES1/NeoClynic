import { IConsultationRepository } from '../domain/repository/IConsultationRepository';
import { IPatientRepository } from '../../patient/domain/repository/IPatientRepository';
import { IMedicRepository } from '../../medic/domain/repository/IMedicRepository';
import { ISecretaryRepository } from '../../secretary/domain/repository/ISecretaryRepository';
import { IReportRepository } from '../../report/domain/repository/IReportRepository';
import { ConsultationResponse } from '../dto/ConsultationResponseDTO';
import { CreateConsultationRequest } from '../dto/CreateConsultationRequestDTO';
import { ListConsultationRequest } from '../dto/ListConsultationRequestDTO';
import { DeleteConsultationRequest } from '../dto/DeleteConsultationRequestDTO';
import { UpdateConsultationRequest } from '../dto/UpdateConsultationRequestDTO';
import { CreateReportBody } from '../../report/dto/CreateReportBodyDTO';
import { UpdateReportBody } from '../../report/dto/UpdateReportBodyDTO';
import { ReportService } from '../../report/service/ReportService';
import { AppError } from '../../../core/errors/AppError';
import bcrypt from 'bcrypt';

export class ConsultationService {
    constructor(
        private consultationRepository: IConsultationRepository,
        private reportRepository: IReportRepository,
        private patientRepository: IPatientRepository,
        private medicRepository: IMedicRepository,
        private secretaryRepository: ISecretaryRepository,
        private reportService =  new ReportService(reportRepository)
    ) { }

    public async create(date: Date, hasFollowUp: boolean, medicId: string, patientId: string, report: CreateReportBody | undefined, userRole: string | undefined) : Promise<ConsultationResponse> {

        if (!date || hasFollowUp===undefined || !medicId || !patientId) {
            throw new AppError("Missing required fields", 400);
        }

        const patient = await this.patientRepository.findById(patientId);

        if(!patient){
            throw new AppError("Patient not exists.", 404);
        }

        const medic = await this.medicRepository.findById(medicId);
        if(!medic){
            throw new AppError("Medic not exists.", 404);
        }

        const createConsultation:CreateConsultationRequest = {
            date,
            hasFollowUp,
            medicId,
            patientId
        };

        const consultation = await this.consultationRepository.createConsultation(createConsultation);

        if (report && userRole != 'SECRETARY') {
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
    

    public async delete(id: string, secretaryPassword: string, userId: string) : Promise<void> {
        const secretary = await this.secretaryRepository.findById(userId);
        if (!secretary) {
            throw new AppError("Secretary not found.", 404);
        }

        const passwordMatch = await bcrypt.compare(secretaryPassword, secretary.password);
            if (!passwordMatch){
                throw new AppError("Password invalid.", 401);
            }

        const consultation = await this.consultationRepository.findById(id);
        if (!consultation) {
            throw new AppError("Consultation not exists.", 404);
        }
        
        const deleteConsultation: DeleteConsultationRequest = { id: consultation.id };

        return await this.consultationRepository.deleteConsultation(deleteConsultation);
    }

    public async update(id:string, date: Date | undefined, hasFollowUp: boolean | undefined, report: UpdateReportBody | undefined,
        userRole:string | undefined
    ) : Promise<ConsultationResponse>{
        const consultation = await this.consultationRepository.findById(id);
        if (!consultation) {
            throw new AppError("Consultation not exists.", 404);
        }

        const updateRequest: UpdateConsultationRequest = { 
            id: consultation.id,
            date,
            hasFollowUp
        };

        const updatedConsultation = await this.consultationRepository.updateConsultation(updateRequest);

        if (report && userRole != 'SECRETARY') {
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

    public async list(id:string, userId: string, userRole: string) : Promise<ConsultationResponse>{
        const consultation = await this.consultationRepository.findById(id);
            if (!consultation) {
              throw new AppError("Consultation not exists.", 404);
            }

        if (userRole === 'MEDIC') {
            const consultations = await this.consultationRepository.findByMedic(userId, undefined, undefined);

            if (consultations.length === 0) {
              throw new AppError("Access denied to this consultation.", 403);
            }

            return consultations[0];
        }

        const list: ListConsultationRequest = { id: consultation.id };
        return await this.consultationRepository.listConsultation(list);
    }

    public async listAll(userId: string, userRole: string, page:number|undefined, limit:number|undefined) : Promise<ConsultationResponse[]> {
        if (userRole === 'MEDIC') {
            return await this.consultationRepository.findByMedic(userId, page, limit);
        }

        return await this.consultationRepository.listConsultations(page, limit);
    }
}
