import { AdminService } from "../service/AdminService";
import { IAdminRepository } from "../domain/repository/IAdminRepository";
import { Request, Response, NextFunction } from "express";
import { updateAdminBodySchema, updateAdminAuthSchema, updateAdminParamsSchema } from "../schema/updateSchema";

export class AdminController {
  constructor(adminRepository: IAdminRepository,
              private adminService: AdminService = new AdminService(adminRepository)
  ) {}

  public async updateAdmin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try{
      const { id } = updateAdminParamsSchema.parse(req.params);
      const { name, email, password, currentPassword } = updateAdminBodySchema.parse(req.body);
      const userId = updateAdminAuthSchema.parse({ id: req.user?.id }).userId;
      const result = await this.adminService.update(id, name, email, password, userId, currentPassword);

      return res.status(200).json({ admin: result });

      } catch (error) {
            return next(error);
        }
      
  }

}
