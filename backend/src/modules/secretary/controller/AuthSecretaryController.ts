import { Request, Response } from 'express';
import { ISecretaryRepository } from '../domain/repository/ISecretaryRepository';
import { AuthSecretaryService } from '../service/AuthSecretaryService';
import { IAuthProvider } from '../../../infra/providers/auth/IAuthProvider';
import { IEmailProvider } from '../../../infra/providers/email/IEmailProvider';
import { loginSecretaryBodySchema } from '../schema/loginSchema';
import { requestSecretaryPasswordResetBodySchema, resetSecretaryPasswordBodySchema } from '../schema/loginSchema';
import { ZodError } from 'zod';

export class AuthSecretaryController {

    constructor(
        secretaryRepository: ISecretaryRepository,
        authProvider: IAuthProvider,
        emailProvider: IEmailProvider,
        private authSecretaryService: AuthSecretaryService = new AuthSecretaryService(secretaryRepository, authProvider, emailProvider),
    ) {}

    async login(req:Request, res:Response) : Promise<Response> {
            const { email, password } = loginSecretaryBodySchema.parse(req.body);
            try {
                const result = await this.authSecretaryService.authenticate(email, password);
                return res.status(200).json({ result });
    
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json({ message: "Validation error", errors: error.issues });
                }
    
                console.error("Login error:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
        }
    
    
        async request(req: Request, res: Response): Promise<Response> {
            const { email } = requestSecretaryPasswordResetBodySchema.parse(req.body);
            try{
                await this.authSecretaryService.requestReset(email);
                return res.status(200).json({ message: "Reset link sent." });
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json({ message: "Validation error", errors: error.issues });
                }
                console.error("Request error:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
      }
    
        async reset(req: Request, res: Response): Promise<Response> {
            const { token, newPassword } = resetSecretaryPasswordBodySchema.parse(req.body);
            try {
            await this.authSecretaryService.resetPassword(token, newPassword);
            return res.status(200).json({ message: "Password reset successfully." });
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json({ message: "Validation error", errors: error.issues });
                }
    
                console.error("Reset error:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
        }
    }