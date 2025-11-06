import { AdminService } from "../service/AdminService";
import { IAdminRepository } from "../domain/repository/IAdminRepository";
import { Request, Response } from "express";

export class AdminController {
  constructor(adminRepository: IAdminRepository,
              private adminService: AdminService = new AdminService(adminRepository)
  ) {}

  public async updateAdmin(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const userId = req.user?.id;

    try {
      const result = await this.adminService.update(id, name, email, password, userId);
      return res.status(200).json({ admin: result });
    } catch (error) {
      console.error("Error updating admin:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

}
