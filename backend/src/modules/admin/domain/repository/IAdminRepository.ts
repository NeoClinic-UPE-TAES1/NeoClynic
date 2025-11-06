import { AdminResponse } from "../../dto/AdminResponseDTO";
import type { Admin } from "../entity/Admin";
import { DeleteAdminRequest } from "../../dto/DeleteAdminRequestDTO";
import { UpdateAdminRequest } from "../../dto/UpdateAdminRequestDTO";
 
export interface IAdminRepository {
    updateAdmin(updateAdmin: UpdateAdminRequest): Promise<AdminResponse>;

    saveResetToken(adminId: string, token: string, expiresAt: Date): Promise<void>;
    invalidateResetToken(token: string): Promise<void>;

    findByResetToken(token: string): Promise<{ adminId: string; expiresAt: Date } | null>;
    findByEmail(email: string): Promise<Admin | null>;
    findById(id: string): Promise<Admin | null>;
}