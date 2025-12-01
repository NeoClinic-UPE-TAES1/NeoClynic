import { Request, Response, NextFunction } from "express";
import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { IAdminRepository } from "../domain/repository/IAdminRepository";
import { AuthAdminService } from "../service/AuthAdminService";
import { IEmailProvider } from "../../../infra/providers/email/IEmailProvider";
import { loginAdminBodySchema, requestAdminPasswordResetBodySchema, resetAdminPasswordBodySchema } from "../schema/loginSchema";

export class AuthAdminController {
    constructor(
        adminRepository: IAdminRepository,
        authProvider: IAuthProvider,
        emailProvider: IEmailProvider,
        private authAdminService: AuthAdminService = new AuthAdminService(adminRepository, authProvider, emailProvider)
    ) { }

    async login(req:Request, res:Response, next: NextFunction) : Promise<Response | void> {
        try{
            console.log('Login request body:', JSON.stringify(req.body, null, 2));
            const { email, password, twoFactorCode } = loginAdminBodySchema.parse(req.body);
            console.log('Parsed successfully:', { email, passwordLength: password?.length, hasTwoFactorCode: !!twoFactorCode });
            const result = await this.authAdminService.authenticate(email, password, twoFactorCode);
            
            return res.status(200).json({ result });

        } catch (error) {
            console.log('Login error:', error);
            return next(error);
        }
    }   

    async request(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
        const { email } = requestAdminPasswordResetBodySchema.parse(req.body);
        await this.authAdminService.requestReset(email);

        return res.status(200).json({ message: "Reset link sent." });

        } catch (error) {
            return next(error);
        }
  }

    async reset(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { token, newPassword } = resetAdminPasswordBodySchema.parse(req.body);
            await this.authAdminService.resetPassword(token, newPassword);

            return res.status(200).json({ message: "Password reset successfully." });
            
        } catch (error) {
            return next(error);
        }
    }
}