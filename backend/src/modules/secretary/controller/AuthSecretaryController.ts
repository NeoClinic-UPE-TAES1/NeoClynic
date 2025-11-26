import { Request, Response, NextFunction } from 'express';
import { ISecretaryRepository } from '../domain/repository/ISecretaryRepository';
import { AuthSecretaryService } from '../service/AuthSecretaryService';
import { IAuthProvider } from '../../../infra/providers/auth/IAuthProvider';
import { IEmailProvider } from '../../../infra/providers/email/IEmailProvider';
import { loginSecretaryBodySchema } from '../schema/loginSchema';
import { requestSecretaryPasswordResetBodySchema, resetSecretaryPasswordBodySchema } from '../schema/loginSchema';

export class AuthSecretaryController {

    constructor(
        secretaryRepository: ISecretaryRepository,
        authProvider: IAuthProvider,
        emailProvider: IEmailProvider,
        private authSecretaryService: AuthSecretaryService = new AuthSecretaryService(secretaryRepository, authProvider, emailProvider),
    ) {}

    async login(req:Request, res:Response, next: NextFunction) : Promise<Response|void> {
        try {
            const { email, password } = loginSecretaryBodySchema.parse(req.body);
            const result = await this.authSecretaryService.authenticate(email, password);

            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
        }
    
    
    async request(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try{
            const { email } = requestSecretaryPasswordResetBodySchema.parse(req.body);
            await this.authSecretaryService.requestReset(email);
            
            return res.status(200).json({ message: "Reset link sent." });
        } catch (error) {
            return next(error);
        }
    }

    async reset(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try {
            const { token, newPassword } = resetSecretaryPasswordBodySchema.parse(req.body);
            await this.authSecretaryService.resetPassword(token, newPassword);
            
            return res.status(200).json({ message: "Password reset successfully." });
        } catch (error) {
            return next(error);
        }
    }
}