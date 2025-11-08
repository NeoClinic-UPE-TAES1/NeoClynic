import { IConsultationRepository } from '../domain/repository/IConsultationRepository';
import { IReportRepository } from '../../report/domain/repository/IReportRepository';
import { IPatientRepository } from '../../patient/domain/repository/IPatientRepository';
import { IMedicRepository } from '../../medic/domain/repository/IMedicRepository';
import { ConsultationService } from '../service/ConsultationService';
import { Request, Response } from "express";
import { registerConsultationBodySchema, registerConsultationAuthSchema } from '../schema/registerSchema';
import { deleteConsultationParamsSchema } from '../schema/deleteSchema';
import { updateConsultationParamsSchema, updateConsultationBodySchema, updateConsultationAuthSchema } from '../schema/updateSchema';
import { listConsultationParamsSchema, listConsultationAuthSchema, listConsultationQuerySchema } from '../schema/listSchema';
import { ZodError } from "zod";

export class ConsultationController {

    constructor(
        consultationRepository: IConsultationRepository,
        reportRepository: IReportRepository,
        patientRepository: IPatientRepository,
        medicRepository: IMedicRepository,
        private consultationService = new ConsultationService(consultationRepository, reportRepository, patientRepository, medicRepository)
    ){
        
    }

    public async registerConsultation(req: Request, res: Response): Promise<Response> {
      const { date, hasFollowUp, medicId, patientId, report } = registerConsultationBodySchema.parse(req.body);
      const userRole = registerConsultationAuthSchema.parse({ userRole: req.user?.role }).userRole;

      try {
        const result = await this.consultationService.create(date, hasFollowUp, medicId, patientId, report, userRole);
        return res.status(201).json({ consultation: result });
      } catch (error) {
              if (error instanceof ZodError) {
                  return res.status(400).json({ message: "Validation error", errors: error.issues });
              }

              console.error("Error registering consultation:", error);
              return res.status(500).json({ message: "Internal server error" });
          }
    }

  public async deleteConsultation(req: Request, res: Response): Promise<Response> {
    const { id } = deleteConsultationParamsSchema.parse(req.params);

    try {
      await this.consultationService.delete(id);
      return res.status(200).json({ message: "Ok" });
    } catch (error) {
              if (error instanceof ZodError) {
                  return res.status(400).json({ message: "Validation error", errors: error.issues });
              }

              console.error("Error deleting consultation:", error);
              return res.status(500).json({ message: "Internal server error" });
          }
  }

  public async updateConsultation(req: Request, res: Response): Promise<Response> {
    const { id } = updateConsultationParamsSchema.parse(req.params);
    const { date, hasFollowUp, report } = updateConsultationBodySchema.parse(req.body);
    const userRole = updateConsultationAuthSchema.parse({ userRole: req.user?.role }).userRole;

    try {
      const result = await this.consultationService.update(id, date, hasFollowUp, report, userRole);
      return res.status(200).json({ consultation: result });
    } catch (error) {
              if (error instanceof ZodError) {
                  return res.status(400).json({ message: "Validation error", errors: error.issues });
              }

              console.error("Error updating consultation:", error);
              return res.status(500).json({ message: "Internal server error" });
          }
  }

  public async listConsultation(req: Request, res: Response): Promise<Response> {
    const { id } = listConsultationParamsSchema.parse(req.params);
    const { userId, userRole } = listConsultationAuthSchema.parse({
          userId: req.user?.id,
          userRole: req.user?.role,
        });

    try {
      const result = await this.consultationService.list(id, userId, userRole);
      return res.status(200).json({ consultation: result });
    } catch (error) {
              if (error instanceof ZodError) {
                  return res.status(400).json({ message: "Validation error", errors: error.issues });
              }

              console.error("Error listing consultation:", error);
              return res.status(500).json({ message: "Internal server error" });
          }
  }

  public async listConsultations(req: Request, res: Response): Promise<Response> {
    const { userId, userRole } = listConsultationAuthSchema.parse({
          userId: req.user?.id,
          userRole: req.user?.role,
        });

    const { page, limit } = listConsultationQuerySchema.parse(req.query);

    try {
      const result = await this.consultationService.listAll(userId, userRole, page, limit);
      return res.status(200).json({ consultations: result });
    } catch (error) {
      if (error instanceof ZodError) {
          return res.status(400).json({ message: "Validation error", errors: error.issues });
      }

      console.error("Error listing consultations:", error);
      return res.status(500).json({ message: "Internal server error" });
      }
  }
  
}