import { Request, Response } from "express";
import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { IMedicRepository } from "../domain/repository/IMedicRepository";
import { AuthMedicService } from "../service/AuthMedicService";
import { IEmailProvider } from "../../../infra/providers/email/IEmailProvider";

export class AuthMedicController {
    constructor(
        medicRepository: IMedicRepository,
        authProvider: IAuthProvider,
        emailProvider: IEmailProvider,
        private authMedicService: AuthMedicService = new AuthMedicService(medicRepository, authProvider, emailProvider)
    ) { }

    async login(req:Request, res:Response) : Promise<Response> {
        const { email, password } = req.body;
        try {
            const result = await this.authMedicService.authenticate(email, password);
            return res.status(200).json({ result });

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
            }
        }

    async request(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        await this.authMedicService.requestReset(email);
        return res.status(200).json({ message: "Reset link sent." });
  }

    async reset(req: Request, res: Response): Promise<Response> {
        const { token, newPassword } = req.body;
        try {
        await this.authMedicService.resetPassword(token, newPassword);
        return res.status(200).json({ message: "Password reset successfully." });
        } catch (error) {
        return res.status(400).json({ message: 'Internal server error' });
        }
    }

    }