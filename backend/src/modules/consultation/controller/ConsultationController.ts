import { IConsultationRepository } from '../domain/repository/IConsultationRepository';
import { IReportRepository } from '../../report/domain/repository/IReportRepository';
import { IPatientRepository } from '../../patient/domain/repository/IPatientRepository';
import { IMedicRepository } from '../../medic/domain/repository/IMedicRepository';
import { ISecretaryRepository } from '../../secretary/domain/repository/ISecretaryRepository';
import { ConsultationService } from '../service/ConsultationService';
import { Request, Response, NextFunction } from "express";
import { registerConsultationBodySchema, registerConsultationAuthSchema } from '../schema/registerSchema';
import { deleteConsultationParamsSchema, deleteConsultationAuthSchema, deleteConsultationBodySchema } from '../schema/deleteSchema';
import { updateConsultationParamsSchema, updateConsultationBodySchema, updateConsultationAuthSchema } from '../schema/updateSchema';
import { listConsultationParamsSchema, listConsultationAuthSchema, listConsultationQuerySchema } from '../schema/listSchema';

export class ConsultationController {

    constructor(
        consultationRepository: IConsultationRepository,
        reportRepository: IReportRepository,
        patientRepository: IPatientRepository,
        medicRepository: IMedicRepository,
        secretaryRepository: ISecretaryRepository,
        private consultationService = new ConsultationService(consultationRepository, reportRepository, patientRepository, medicRepository, secretaryRepository)
    ){
        
    }

    public async registerConsultation(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try{
            const { date, hasFollowUp, medicId, patientId, report } = registerConsultationBodySchema.parse(req.body);
            const userRole = registerConsultationAuthSchema.parse({ userRole: req.user?.role }).userRole;
            const result = await this.consultationService.create(date, hasFollowUp, medicId, patientId, report, userRole);

            return res.status(201).json({ consultation: result });
        } catch (error) {
            return next(error);
        }
    }

  public async deleteConsultation(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try {
        const { id } = deleteConsultationParamsSchema.parse(req.params);
        const { secretaryPassword } = deleteConsultationBodySchema.parse(req.body);
        const { userId } = deleteConsultationAuthSchema.parse({ userId: req.user?.id });
        await this.consultationService.delete(id, secretaryPassword, userId);

        return res.status(200).json({ message: "Ok" });
      } catch (error) {
          return next(error);
      }
  }

  public async updateConsultation(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
      try {
          const { id } = updateConsultationParamsSchema.parse(req.params);
          const { date, hasFollowUp, report } = updateConsultationBodySchema.parse(req.body);
          const userRole = updateConsultationAuthSchema.parse({ userRole: req.user?.role }).userRole;
          const result = await this.consultationService.update(id, date, hasFollowUp, report, userRole);

        return res.status(200).json({ consultation: result }); 
    } catch (error) {
        return next(error);
    }   
  }

  public async listConsultation(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try{
        const { id } = listConsultationParamsSchema.parse(req.params);
        const { userId, userRole } = listConsultationAuthSchema.parse({
                userId: req.user?.id,
                userRole: req.user?.role,
            });
        const result = await this.consultationService.list(id, userId, userRole);

        return res.status(200).json({ consultation: result });
      } catch (error) {
            return next(error);
        }
  }

  public async listConsultations(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try{
      const { userId, userRole } = listConsultationAuthSchema.parse({
            userId: req.user?.id,
            userRole: req.user?.role,
          });
      const { page, limit } = listConsultationQuerySchema.parse(req.query);
      const result = await this.consultationService.listAll(userId, userRole, page, limit);
      
      return res.status(200).json({ consultations: result });
      } catch (error) {
            return next(error);
        }
      
  }
  
}