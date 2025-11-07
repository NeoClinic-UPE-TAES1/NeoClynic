import { Request, Response } from "express";
import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { IMedicRepository } from "../domain/repository/IMedicRepository";
import { AuthMedicService } from "../service/AuthMedicService";
import { IEmailProvider } from "../../../infra/providers/email/IEmailProvider";
import { loginMedicBodySchema, requestMedicPasswordResetBodySchema, resetMedicPasswordBodySchema } from "../schema/loginSchema";
import { ZodError } from "zod";

export class AuthMedicController {
    constructor(
        medicRepository: IMedicRepository,
        authProvider: IAuthProvider,
        emailProvider: IEmailProvider,
        private authMedicService: AuthMedicService = new AuthMedicService(medicRepository, authProvider, emailProvider)
    ) { }

    async login(req:Request, res:Response) : Promise<Response> {
        const { email, password } = loginMedicBodySchema.parse(req.body);
        try {
            const result = await this.authMedicService.authenticate(email, password);
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
        const { email } = requestMedicPasswordResetBodySchema.parse(req.body);
        try{
            await this.authMedicService.requestReset(email);
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
        const { token, newPassword } = resetMedicPasswordBodySchema.parse(req.body);
        try {
        await this.authMedicService.resetPassword(token, newPassword);
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