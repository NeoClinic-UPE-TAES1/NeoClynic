import crypto from "crypto";
import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { IAdminRepository } from "../domain/repository/IAdminRepository";
import { LoginAdminResponse } from "../dto/LoginAdminResponse";
import { IEmailProvider } from "../../../infra/providers/email/IEmailProvider";
import { UpdateAdminRequest } from "../dto/UpdateAdminRequestDTO";
import { AppError } from "../../../core/errors/AppError";
import bcrypt from 'bcrypt';
import speakeasy from "speakeasy";

export class AuthAdminService{
    constructor(
        private adminRepository: IAdminRepository,
        private authProvider: IAuthProvider,
        private emailProvider: IEmailProvider
    ){}

    async authenticate(email: string, password: string, twoFactorCode?: string): Promise<LoginAdminResponse | null> {
        const admin = await this.adminRepository.findByEmail(email);
        if (!admin) {
            throw new AppError("Invalid credentials", 401);
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid credentials", 401);
        }

        if (!twoFactorCode || twoFactorCode.trim() === '') {
        throw new AppError("Two-factor authentication code required.", 401);
        }

        const verified = speakeasy.totp.verify({
            secret: admin.twoFactorSecret!,
            encoding: "base32",
            token: twoFactorCode,
            window: 1
        });

        if (!verified) {
            throw new AppError("Invalid two-factor authentication code.", 401);
        }

        const role = (admin as any).role ?? 'ADMIN';

        const token = this.authProvider.sign({ id: admin.id, role });

        const result: LoginAdminResponse = {
            token,
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email
            }
        };

        return result;
    }

    async requestReset(email: string): Promise<void> {
        const admin = await this.adminRepository.findByEmail(email);
        if (!admin) return;

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

        await this.adminRepository.saveResetToken(admin.id, hashedToken, expiresAt);

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        const htmlBody = `
        <h2>Redefinição de senha - NeoClinic</h2>
        <p>Você solicitou a redefinição de senha da sua conta de administrador.</p>
        <p>Para continuar, clique no link abaixo dentro de 15 minutos:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>Se você não solicitou essa ação, ignore este e-mail.</p>
        `;
        await this.emailProvider.sendEmail(
        email,
        "Redefinição de senha - NeoClynic",
        htmlBody,
        undefined
        );
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const record = await this.adminRepository.findByResetToken(hashedToken);

    if (!record || record.expiresAt < new Date()) {
        throw new AppError("Token inválido ou expirado.", 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateAdminRequest: UpdateAdminRequest = {
        id: record.adminId,
        password: hashedPassword
    }

    await this.adminRepository.updateAdmin(updateAdminRequest);
    await this.adminRepository.invalidateResetToken(token);
    }
}