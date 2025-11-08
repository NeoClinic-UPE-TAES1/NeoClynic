import { MedicService } from "../service/MedicService";
import { IAdminRepository } from "../../admin/domain/repository/IAdminRepository";
import { IMedicRepository } from "../domain/repository/IMedicRepository";
import { Request, Response } from "express";
import { authenticatedUserSchema } from "../schema/medicSchema";
import { registerMedicBodySchema } from "../schema/registerSchema";
import { listMedicParamsSchema, listMedicQuerySchema } from "../schema/listSchema";
import { deleteMedicParamsSchema, deleteMedicBodySchema } from "../schema/deleteSchema";
import { updateMedicParamsSchema, updateMedicBodySchema } from "../schema/updateSchema";
import { ZodError } from "zod";

export class MedicController {
  constructor(medicRepository: IMedicRepository,
              adminRepository: IAdminRepository,
              private medicService: MedicService = new MedicService(medicRepository, adminRepository)
  ) {}

  public async registerMedic(req: Request, res: Response): Promise<Response> {
    const { name, email, password, specialty } = registerMedicBodySchema.parse(req.body);

    try {
      const result = await this.medicService.create(name, email, password, specialty);
      return res.status(201).json({ medic: result });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Validation error", errors: error.issues });
        }

        console.error("Error registering medic:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteMedic(req: Request, res: Response): Promise<Response> {
    const { adminPassword } = deleteMedicBodySchema.parse(req.body);
    const { id } = deleteMedicParamsSchema.parse(req.params);
    const { id: userId } = authenticatedUserSchema.parse({ id: req.user?.id });

    try {
      await this.medicService.delete(id, adminPassword, userId);
      return res.status(200).json({ message: "Ok" });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Validation error", errors: error.issues });
        }

        console.error("Error deleting medic:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async updateMedic(req: Request, res: Response): Promise<Response> {
    const { id } = updateMedicParamsSchema.parse(req.params);
    const { name, email, password, specialty } = updateMedicBodySchema.parse(req.body);
    const { id: userId } = authenticatedUserSchema.parse({ id: req.user?.id });

    try {
      const result = await this.medicService.update(id, name, email, password, specialty, userId);
      return res.status(200).json({ medic: result });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Validation error", errors: error.issues });
        }

        console.error("Error updating medic:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listMedic(req: Request, res: Response): Promise<Response> {
    const { id } = listMedicParamsSchema.parse(req.params);

    try {
      const result = await this.medicService.list(id);
      return res.status(200).json({ medic: result });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Validation error", errors: error.issues });
        }

        console.error("Error listing medic:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listMedics(req: Request, res: Response): Promise<Response> {
    const { page, limit } = listMedicQuerySchema.parse(req.query);
    try {
      const result = await this.medicService.listAll(page, limit);
      return res.status(200).json({ medics: result });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid query parameters", errors: error.issues });
        }

        console.error("Error listing medic:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
  }
}
