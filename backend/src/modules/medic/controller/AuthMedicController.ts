import { Request, Response } from "express";
import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { IMedicRepository } from "../domain/repository/IMedicRepository";
import { AuthMedicService } from "../service/AuthMedicService";

export class AuthMedicController {
    constructor(
        medicRepository: IMedicRepository,
        authProvider: IAuthProvider,
        private authMedicService: AuthMedicService = new AuthMedicService(medicRepository, authProvider)
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

    }