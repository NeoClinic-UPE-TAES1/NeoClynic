import { AdminService } from "../service/AdminService";
import { IAdminRepository } from "../domain/repository/IAdminRepository";
import { Request, Response } from "express";
import { updateAdminBodySchema, updateAdminAuthSchema, updateAdminParamsSchema } from "../schema/updateSchema";
import { ZodError } from "zod";

export class AdminController {
  constructor(adminRepository: IAdminRepository,
              private adminService: AdminService = new AdminService(adminRepository)
  ) {}

  public async updateAdmin(req: Request, res: Response): Promise<Response> {
    const { id } = updateAdminParamsSchema.parse(req.params);
    const { name, email, password } = updateAdminBodySchema.parse(req.body);
    const userId = updateAdminAuthSchema.parse({ id: req.user?.id }).userId;

    try {
      const result = await this.adminService.update(id, name, email, password, userId);
      return res.status(200).json({ admin: result });
    } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation error", errors: error.issues });
            }
            console.error("Update admin error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
  }

}
