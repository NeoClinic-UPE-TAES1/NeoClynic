import { Request, Response } from 'express';
import { ISecretaryRepository } from '../domain/repository/ISecretaryRepository';
import { AuthSecretaryService } from '../service/AuthSecretaryService';
import { IAuthProvider } from '../../../infra/providers/auth/IAuthProvider';
import { IEmailProvider } from '../../../infra/providers/email/IEmailProvider';

export class AuthSecretaryController {

    constructor(
        secretaryRepository: ISecretaryRepository,
        authProvider: IAuthProvider,
        emailProvider: IEmailProvider,
        private authSecretaryService: AuthSecretaryService = new AuthSecretaryService(secretaryRepository, authProvider, emailProvider),
    ) {}

    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        try {
            const result = await this.authSecretaryService.authenticate(email, password);
            return res.status(200).json({ result });

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
            }
        }

    async request(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        await this.authSecretaryService.requestReset(email);
        return res.status(200).json({ message: "Reset link sent." });
  }

    async reset(req: Request, res: Response): Promise<Response> {
        const { token, newPassword } = req.body;
        try {
        await this.authSecretaryService.resetPassword(token, newPassword);
        return res.status(200).json({ message: "Password reset successfully." });
        } catch (error) {
        return res.status(400).json({ message: 'Internal server error' });
        }
    }
    }