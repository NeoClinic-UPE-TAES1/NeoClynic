import { Request, Response } from "express";
import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { IMedicRepository } from "../domain/repository/IMedicRepository";

export class AuthMedicController {
    constructor(
        private jwtProvider: IAuthProvider,
        private medicRepository: IMedicRepository
        // private authMedicService: AuthMedicService = new AuthMedicService(jwtProvider, medicRepository)
    ) { }

    async login(req:Request, res:Response) : Promise<Response> {
        const { email, password } = req.body;
        try {
            return res.status(200).json({ message: "Login successful" });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }

    }

}