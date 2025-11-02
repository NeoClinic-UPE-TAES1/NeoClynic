import { IConsultationRepository } from '../domain/repository/IConsultationRepository';
import { IReportRepository } from '../../report/domain/repository/IReportRepository';
import { IPatientRepository } from '../../patient/domain/repository/IPatientRepository';
import { IMedicRepository } from '../../medic/domain/repository/IMedicRepository';
import { ConsultationService } from '../service/ConsultationService';
import { Request, Response } from "express";

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
    const { date, hasFollowUp, medicId, patiendId, report } = req.body;

    try {
      const result = await this.consultationService.create(date, hasFollowUp, medicId, patiendId, report);
      return res.status(201).json({ consultation: result });
    } catch (error) {
      console.error("Error registering consultation:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteConsultation(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await this.consultationService.delete(id);
      return res.status(200).json({ message: "Ok" });
    } catch (error) {
      console.error("Error deleting consultation:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async updateConsultation(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { date, hasFollowUp, report } = req.body;

    try {
      const result = await this.consultationService.update(id, date, hasFollowUp, report);
      return res.status(200).json({ consultation: result });
    } catch (error) {
      console.error("Error updating consultation:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listConsultation(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const result = await this.consultationService.list(id);
      return res.status(200).json({ consultation: result });
    } catch (error) {
      console.error("Error listing consultation:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listConsultations(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.consultationService.listAll();
      return res.status(200).json({ consultations: result });
    } catch (error) {
      console.error("Error listing consultations:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  
}