import { PatientService } from "../service/PatientService";
import { IPatientRepository } from "../domain/repository/IPatientRepository";
import { IObservationRepository } from "../../observation/domain/repository/IObservationRepository";
import { IConsultationRepository } from "../../consultation/domain/repository/IConsultationRepository";
import { Request, Response } from "express";
import { registerPatientBodySchema } from "../schema/registerSchema";
import { deletePatientBodySchema, deletePatientParamsSchema } from "../schema/deleteSchema";
import { updatePatientParamsSchema, updatePatientBodySchema } from "../schema/updateSchema";
import { listPatientParamsSchema, listPatientAuthSchema, listPatientQuerySchema } from "../schema/listSchema";
import { ZodError } from "zod";

export class PatientController {
  constructor(patientRepository: IPatientRepository,
              observationRepository: IObservationRepository,
              consultationRepository: IConsultationRepository,
              private patientService: PatientService = new PatientService(patientRepository, observationRepository, consultationRepository),
  ) {}

  public async registerPatient(req: Request, res: Response): Promise<Response> {
    const { name, birthDay, sex, cpf, ethnicity, email, observation } = registerPatientBodySchema.parse(req.body);

    try {
      const result = await this.patientService.create(name, birthDay, sex, cpf, ethnicity, email, observation);
      return res.status(201).json({ patient: result });
    } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation error", errors: error.issues });
            }

            console.error("register patient error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
  }

  public async deletePatient(req: Request, res: Response): Promise<Response> {
    const { id } = deletePatientParamsSchema.parse(req.params);
    const { cpf } = deletePatientBodySchema.parse(req.body);

    try {
      await this.patientService.delete(id, cpf);
      return res.status(200).json({ message: "Ok" });
    } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation error", errors: error.issues });
            }

            console.error("delete patient error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
  }

  public async updatePatient(req: Request, res: Response): Promise<Response> {
    const { id } = updatePatientParamsSchema.parse(req.params);
    const { name, birthDay, sex, cpf, ethnicity, email, observation } = updatePatientBodySchema.parse(req.body);

    try {
      const result = await this.patientService.update(id, name, birthDay, sex, cpf, ethnicity, email, observation);
      return res.status(200).json({ patient: result });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.issues });
      }

      console.error("Error updating patient:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listPatient(req: Request, res: Response): Promise<Response> {
    const { id } = listPatientParamsSchema.parse(req.params);
    const { userId, userRole } = listPatientAuthSchema.parse({
      userId: req.user?.id,
      userRole: req.user?.role,
    });

    try {
      const result = await this.patientService.list(id, userId, userRole);
      return res.status(200).json({ patient: result });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.issues });
      }

      console.error("Error listing patient:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listPatients(req: Request, res: Response): Promise<Response> {
    const { userId, userRole } = listPatientAuthSchema.parse({
      userId: req.user?.id,
      userRole: req.user?.role,
    });

    const { page, limit } = listPatientQuerySchema.parse(req.query);

    try {
      const result = await this.patientService.listAll(userId, userRole, page, limit);
      return res.status(200).json({ patients: result });
    } catch (error) {
      if (error instanceof ZodError) {
          return res.status(400).json({ message: "Invalid query parameters", errors: error.issues });
      }

      console.error("Error listing patients:", error);
      return res.status(500).json({ message: "Internal server error" });
      }
  }
}
