import { IAdminRepository } from "../domain/repository/IAdminRepository";
import { AdminResponse } from "../dto/AdminResponseDTO";
import { UpdateAdminRequest } from "../dto/UpdateAdminRequestDTO";
import { AppError } from "../../../core/errors/AppError";
import bcrypt from "bcrypt";

export class AdminService {
  constructor(
    private adminRepository: IAdminRepository
  ) {
  }

  async update(
    id: string,
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    userId: string | undefined,
    currentPassword: string | undefined
  ): Promise<AdminResponse> {
    const admin = await this.adminRepository.findById(id);
    if (!admin) {
      throw new AppError("Admin not exists.", 404);
    }

    if (userId != admin.id){
            throw new AppError("Invalid user id.", 403);
        }

    let hashedPassword: string | undefined = undefined;
    if (password) {
      // Admin sempre está alterando sua própria senha (não há admin superior)
      if (!currentPassword) {
        throw new AppError("Current password is required to change password.", 400);
      }
      const passwordMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!passwordMatch) {
        throw new AppError("Current password is incorrect.", 401);
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateRequest: UpdateAdminRequest = {
      id,
      name,
      email,
      password: hashedPassword
    };

    return await this.adminRepository.updateAdmin(updateRequest);
  }
  

}
