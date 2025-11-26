import { Request, Response, NextFunction } from "express";
import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { IMedicRepository } from "../domain/repository/IMedicRepository";
import { AuthMedicService } from "../service/AuthMedicService";
import { IEmailProvider } from "../../../infra/providers/email/IEmailProvider";
import { loginMedicBodySchema, requestMedicPasswordResetBodySchema, resetMedicPasswordBodySchema } from "../schema/loginSchema";

export class AuthMedicController {
    constructor(
        medicRepository: IMedicRepository,
        authProvider: IAuthProvider,
        emailProvider: IEmailProvider,
        private authMedicService: AuthMedicService = new AuthMedicService(medicRepository, authProvider, emailProvider)
    ) { }

    async login(req:Request, res:Response, next: NextFunction) : Promise<Response|void> {
        try {
            const { email, password } = loginMedicBodySchema.parse(req.body);
            const result = await this.authMedicService.authenticate(email, password);
            
            return res.status(200).json({ result });
        } catch (error) {
            return next(error);
        }
    }


    async request(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try {
            const { email } = requestMedicPasswordResetBodySchema.parse(req.body);
            await this.authMedicService.requestReset(email);

            return res.status(200).json({ message: "Reset link sent." });
        } catch (error) {
            return next(error);
        }
  }

    async reset(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try{
            const { token, newPassword } = resetMedicPasswordBodySchema.parse(req.body);
            await this.authMedicService.resetPassword(token, newPassword);

            return res.status(200).json({ message: "Password reset successfully." });
        } catch (error) {
            return next(error);
        }
    }
}