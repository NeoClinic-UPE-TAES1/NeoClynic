import { MedicService } from "../service/MedicService";
import { IAdminRepository } from "../../admin/domain/repository/IAdminRepository";
import { IMedicRepository } from "../domain/repository/IMedicRepository";
import { Request, Response, NextFunction } from "express";
import { authenticatedUserSchema } from "../schema/medicSchema";
import { registerMedicBodySchema } from "../schema/registerSchema";
import { listMedicParamsSchema, listMedicQuerySchema } from "../schema/listSchema";
import { deleteMedicParamsSchema, deleteMedicBodySchema } from "../schema/deleteSchema";
import { updateMedicParamsSchema, updateMedicBodySchema } from "../schema/updateSchema";

export class MedicController {
  constructor(medicRepository: IMedicRepository,
              adminRepository: IAdminRepository,
              private medicService: MedicService = new MedicService(medicRepository, adminRepository)
  ) {}

  public async registerMedic(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try{
      const { name, email, password, specialty } = registerMedicBodySchema.parse(req.body);
      const result = await this.medicService.create(name, email, password, specialty);

      return res.status(201).json({ medic: result });
      } catch (error) {
            return next(error);
        }
  }

  public async deleteMedic(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try{
      const { adminPassword } = deleteMedicBodySchema.parse(req.body);
      const { id } = deleteMedicParamsSchema.parse(req.params);
      const { id: userId } = authenticatedUserSchema.parse({ id: req.user?.id });
      await this.medicService.delete(id, adminPassword, userId);

      return res.status(200).json({ message: "Ok" });
      } catch (error) {
            return next(error);
        }
  }

  public async updateMedic(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    try{
      const { id } = updateMedicParamsSchema.parse(req.params);
      const { name, email, password, specialty } = updateMedicBodySchema.parse(req.body);
      const { id: userId } = authenticatedUserSchema.parse({ id: req.user?.id });
      const result = await this.medicService.update(id, name, email, password, specialty, userId);

      return res.status(200).json({ medic: result });
      } catch (error) {
            return next(error);
        }
  }

  public async listMedic(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
      try{
        const { id } = listMedicParamsSchema.parse(req.params);
        const result = await this.medicService.list(id);

        return res.status(200).json({ medic: result });
      } catch (error) {
            return next(error);
        }
  }

  public async listMedics(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
      try{
        const { page, limit } = listMedicQuerySchema.parse(req.query);
        const result = await this.medicService.listAll(page, limit);

        return res.status(200).json({ medics: result });
      } catch (error) {
            return next(error);
        }
  }
}
