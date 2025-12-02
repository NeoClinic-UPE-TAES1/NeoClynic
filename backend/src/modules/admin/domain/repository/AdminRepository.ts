import { Admin } from "../entity/Admin";
import { prisma } from "../../../../infra/database/prismaClient";
import { IAdminRepository } from "./IAdminRepository";
import { AdminResponse } from "../../dto/AdminResponseDTO";
import { UpdateAdminRequest } from "../../dto/UpdateAdminRequestDTO";

export class AdminRepository implements IAdminRepository {
  async updateAdmin(updateAdmin: UpdateAdminRequest): Promise<AdminResponse> {
    const { id, name, email, password } = updateAdmin;

    const data = await prisma.admin.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password }),
      },
    });

    return {
      id: data.id,
      name: data.name,
      email: data.email
    };
  }

  async saveResetToken(adminId: string, token: string, expiresAt: Date): Promise<void> {
    await prisma.admin.update({
      where: { id: adminId },
      data: {
        resetToken: token,
        resetTokenExpiresAt: expiresAt
      }
    });
  }

  async invalidateResetToken(token: string): Promise<void> {
    await prisma.admin.update({
      where: { resetToken: token },
      data: {
        resetToken: null,
        resetTokenExpiresAt: null
      }
    });
  }

  async findByResetToken(token: string): Promise<{ adminId: string; expiresAt: Date } | null> {
    const admin = await prisma.admin.findFirst({
      where: { resetToken: token }
    });

    if (!admin) return null;
  
    return { adminId: admin.id, expiresAt: admin.resetTokenExpiresAt! };
  }

  async findById(id: string): Promise<Admin | null> {
    return await prisma.admin.findFirst({ where: { id } });
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return await prisma.admin.findFirst({ where: { email } });
  }
}
