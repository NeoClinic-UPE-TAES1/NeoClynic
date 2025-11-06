import { PatientService } from "../service/PatientService";
import { IPatientRepository } from "../domain/repository/IPatientRepository";
import { IObservationRepository } from "../../observation/domain/repository/IObservationRepository";
import { IConsultationRepository } from "../../consultation/domain/repository/IConsultationRepository";
import { Request, Response } from "express";

export class PatientController {
  constructor(patientRepository: IPatientRepository,
              observationRepository: IObservationRepository,
              consultationRepository: IConsultationRepository,
              private patientService: PatientService = new PatientService(patientRepository, observationRepository, consultationRepository),
  ) {}

  public async registerPatient(req: Request, res: Response): Promise<Response> {
    const { name, birthDay, sex, cpf, ethnicity, email, observation } = req.body;

    try {
      const result = await this.patientService.create(name, birthDay, sex, cpf, ethnicity, email, observation);
      return res.status(201).json({ patient: result });
    } catch (error) {
      console.error("Error registering patient:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deletePatient(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { cpf } = req.body;

    try {
      await this.patientService.delete(id, cpf);
      return res.status(200).json({ message: "Ok" });
    } catch (error) {
      console.error("Error deleting patient:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async updatePatient(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, birthDay, sex, cpf, ethnicity, email, observation } = req.body;

    try {
      const result = await this.patientService.update(id, name, birthDay, sex, cpf, ethnicity, email, observation);
      return res.status(200).json({ patient: result });
    } catch (error) {
      console.error("Error updating patient:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listPatient(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    try {
      const result = await this.patientService.list(id, userId, userRole);
      return res.status(200).json({ patient: result });
    } catch (error) {
      console.error("Error listing patient:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listPatients(req: Request, res: Response): Promise<Response> {
    const userId = req.user?.id;
    const userRole = req.user?.role;
    try {
      const result = await this.patientService.listAll(userId, userRole);
      return res.status(200).json({ patients: result });
    } catch (error) {
      console.error("Error listing patients:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
