import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { ISecretaryRepository } from "../domain/repository/ISecretaryRepository";
import { LoginSecretaryResponse } from "../dto/LoginSecretaryResponse";
import { IEmailProvider } from "../../../infra/providers/email/IEmailProvider";
import { UpdateSecretaryRequest } from "../dto/UpdateSecretaryRequestDTO";
import { AppError } from "../../../core/errors/AppError";
import bcrypt from 'bcrypt';
import crypto from "crypto";

export class AuthSecretaryService{
    constructor(
        private secretaryRepository: ISecretaryRepository,
        private authProvider: IAuthProvider,
        private emailProvider: IEmailProvider
    ){}

    async authenticate(email: string, password: string): Promise<LoginSecretaryResponse | null> {
        const secretary = await this.secretaryRepository.findByEmail(email);
        if (!secretary) {
            throw new AppError("Secretary not found.", 404);
        }

        const isPasswordValid = await bcrypt.compare(password, secretary.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid password.", 401);
        }

        const role = (secretary as any).role ?? 'SECRETARY';

        const token = this.authProvider.sign({ id: secretary.id, role });

        const result: LoginSecretaryResponse = {
            token,
            secretary: {
                id: secretary.id,
                name: secretary.name,
                email: secretary.email
            }
        };

        return result;
    }

    async requestReset(email: string): Promise<void> {
        const secretary = await this.secretaryRepository.findByEmail(email);
        if (!secretary) return;
    
        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min
    
        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    
        await this.secretaryRepository.saveResetToken(secretary.id, hashedToken, expiresAt);
    
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        const htmlBody = `
        <h2>Redefinição de senha - NeoClinic</h2>
        <p>Você solicitou a redefinição de senha da sua conta de secretária.</p>
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
        const record = await this.secretaryRepository.findByResetToken(hashedToken);
    
        if (!record || record.expiresAt < new Date()) {
          throw new AppError("Token inválido ou expirado.", 400);
        }
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
        const updateSecretaryRequest: UpdateSecretaryRequest = {
            id: record.secretaryId,
            password: hashedPassword
        }

        await this.secretaryRepository.updateSecretary(updateSecretaryRequest);
        await this.secretaryRepository.invalidateResetToken(token);
      }
}