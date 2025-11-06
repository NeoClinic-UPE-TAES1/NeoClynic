import { IAdminRepository } from "../domain/repository/IAdminRepository";
import { DeleteAdminRequest } from "../dto/DeleteAdminRequestDTO";
import { AdminResponse } from "../dto/AdminResponseDTO";
import { UpdateAdminRequest } from "../dto/UpdateAdminRequestDTO";
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
    userId:string | undefined
  ): Promise<AdminResponse> {
    const admin = await this.adminRepository.findById(id);
    if (!admin) {
      throw new Error("Admin not exists.");
    }

    if (userId != admin.id){
            throw new Error("Invalid id.");
        }

    let hashedPassword: string | undefined = undefined;
    if (password) {
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
