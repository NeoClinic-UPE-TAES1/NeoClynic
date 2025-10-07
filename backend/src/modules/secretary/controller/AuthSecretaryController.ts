import { Request, Response } from 'express';
import { ISecretaryRepository } from '../domain/repository/ISecretaryRepository';
import { AuthSecretaryService } from '../service/AuthSecretaryService';
import { IAuthProvider } from '../../../infra/providers/auth/IAuthProvider';

export class AuthSecretaryController {

    constructor(
        secretaryRepository: ISecretaryRepository,
        authProvider: IAuthProvider,
        private authSecretaryService: AuthSecretaryService = new AuthSecretaryService(authProvider,secretaryRepository),
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
    }