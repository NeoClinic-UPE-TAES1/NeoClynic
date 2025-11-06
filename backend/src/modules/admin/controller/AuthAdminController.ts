import { Request, Response } from "express";
import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { IAdminRepository } from "../domain/repository/IAdminRepository";
import { AuthAdminService } from "../service/AuthAdminService";
import { IEmailProvider } from "../../../infra/providers/email/IEmailProvider";

export class AuthAdminController {
    constructor(
        adminRepository: IAdminRepository,
        authProvider: IAuthProvider,
        emailProvider: IEmailProvider,
        private authAdminService: AuthAdminService = new AuthAdminService(adminRepository, authProvider, emailProvider)
    ) { }

    async login(req:Request, res:Response) : Promise<Response> {
        const { email, password, twoFactorCode } = req.body;
        try {
            const result = await this.authAdminService.authenticate(email, password, twoFactorCode);
            return res.status(200).json({ result });

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
            }
        }

    async request(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        await this.authAdminService.requestReset(email);
        return res.status(200).json({ message: "Reset link sent." });
  }

    async reset(req: Request, res: Response): Promise<Response> {
        const { token, newPassword } = req.body;
        try {
        await this.authAdminService.resetPassword(token, newPassword);
        return res.status(200).json({ message: "Password reset successfully." });
        } catch (error) {
        return res.status(400).json({ message: 'Internal server error' });
        }
    }

    }