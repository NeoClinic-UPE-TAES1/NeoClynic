import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { IMedicRepository } from "../domain/repository/IMedicRepository";
import { LoginMedicResponse } from "../dto/LoginMedicResponse";
import { IEmailProvider } from "../../../infra/providers/email/IEmailProvider";
import { UpdateMedicRequest } from "../dto/UpdateMedicRequestDTO";
import { AppError } from "../../../core/errors/AppError";
import bcrypt from 'bcrypt';
import crypto from "crypto";

export class AuthMedicService{
    constructor(
        private medicRepository: IMedicRepository,
        private authProvider: IAuthProvider,
        private emailProvider: IEmailProvider
    ){}

    async authenticate(email: string, password: string): Promise<LoginMedicResponse | null> {
        const medic = await this.medicRepository.findByEmail(email);
        if (!medic) {
            throw new AppError("Medic not found.", 404);
        }

        const isPasswordValid = await bcrypt.compare(password, medic.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid password.", 401);
        }

        const role = (medic as any).role ?? 'MEDIC';

        const token = this.authProvider.sign({ id: medic.id, role });

        const result: LoginMedicResponse = {
            token,
            medic: {
                id: medic.id,
                name: medic.name,
                email: medic.email,
                specialty: medic.specialty
            }
        };

        return result;
    }

    async requestReset(email: string): Promise<void> {
        const medic = await this.medicRepository.findByEmail(email);
        if (!medic) return;

        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min
    
        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

        await this.medicRepository.saveResetToken(medic.id, hashedToken, expiresAt);

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}&type=medic`;
        const htmlBody = `
        <h2>Redefinição de senha - NeoClinic</h2>
        <p>Você solicitou a redefinição de senha da sua conta de médico.</p>
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
        console.log('AuthMedicService.resetPassword - Input token:', token);
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        console.log('Hashed token:', hashedToken);
        
        const record = await this.medicRepository.findByResetToken(hashedToken);
        console.log('Found record:', record ? { medicId: record.medicId, expiresAt: record.expiresAt } : 'null');
    
        if (!record || record.expiresAt < new Date()) {
          console.log('Token validation failed:', { 
            recordExists: !!record, 
            expiresAt: record?.expiresAt, 
            now: new Date(),
            expired: record ? record.expiresAt < new Date() : 'no record'
          });
          throw new AppError("Token inválido ou expirado.", 400);
        }
    
        console.log('Hashing new password...');
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
        const updateMedicRequest: UpdateMedicRequest = {
            id: record.medicId,
            password: hashedPassword
        }

        console.log('Updating medic with id:', record.medicId);
        await this.medicRepository.updateMedic(updateMedicRequest);
        console.log('Invalidating reset token...');
        await this.medicRepository.invalidateResetToken(hashedToken);
        console.log('Password reset completed successfully');
      }
}