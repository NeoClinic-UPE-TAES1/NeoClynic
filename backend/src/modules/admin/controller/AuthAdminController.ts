import { Request, Response } from "express";
import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { IAdminRepository } from "../domain/repository/IAdminRepository";
import { AuthAdminService } from "../service/AuthAdminService";
import { IEmailProvider } from "../../../infra/providers/email/IEmailProvider";
import { loginAdminBodySchema, requestAdminPasswordResetBodySchema, resetAdminPasswordBodySchema } from "../schema/loginSchema";
import { ZodError } from "zod";

export class AuthAdminController {
    constructor(
        adminRepository: IAdminRepository,
        authProvider: IAuthProvider,
        emailProvider: IEmailProvider,
        private authAdminService: AuthAdminService = new AuthAdminService(adminRepository, authProvider, emailProvider)
    ) { }

    async login(req:Request, res:Response) : Promise<Response> {
        const { email, password, twoFactorCode } = loginAdminBodySchema.parse(req.body);
        try {
            const result = await this.authAdminService.authenticate(email, password, twoFactorCode);
            return res.status(200).json({ result });

        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation error", errors: error.issues });
            }

            console.error("Reset error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        }

    async request(req: Request, res: Response): Promise<Response> {
        try{
            const { email } = requestAdminPasswordResetBodySchema.parse(req.body);
            await this.authAdminService.requestReset(email);
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
        const { token, newPassword } = resetAdminPasswordBodySchema.parse(req.body);
        try {
        await this.authAdminService.resetPassword(token, newPassword);
        return res.status(200).json({ message: "Password reset successfully." });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation error", errors: error.issues });
            }
            console.error("Request error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    }