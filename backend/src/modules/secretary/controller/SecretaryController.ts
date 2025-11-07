import {SecretaryService} from "../service/SecretaryService";
import { ISecretaryRepository } from "../domain/repository/ISecretaryRepository";
import { Request, Response } from 'express';
import { ZodError } from "zod";
import { authenticatedUserSchema } from "../schema/secretarySchema";
import { registerSecretaryBodySchema } from "../schema/registerSchema";
import { deleteSecretaryParamsSchema, deleteSecretaryBodySchema } from "../schema/deleteSchema";
import { updateSecretaryParamsSchema, updateSecretaryBodySchema } from "../schema/updateSchema";
import { listSecretaryParamsSchema } from "../schema/listSchema";

export class SecretaryController {

    constructor(secretaryRepository: ISecretaryRepository,
                private secretaryService: SecretaryService = new SecretaryService(secretaryRepository)
    ) {}

    public async registerSecretary(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = registerSecretaryBodySchema.parse(req.body);
            const result = await this.secretaryService.create(name, email, password);
            return res.status(201).json({ secretary: result });

        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation error", errors: error.issues });
            }

            console.error("Error registering secretary:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    public async deleteSecretary(req: Request, res: Response):Promise<Response>{
        const { password } = deleteSecretaryBodySchema.parse(req.body);
        const { id } = deleteSecretaryParamsSchema.parse(req.params);
        const { id: userId } = authenticatedUserSchema.parse({ id: req.user?.id });

        try{
            await this.secretaryService.delete(id, password, userId);
            return res.status(200).json({ message: 'Ok' });

        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation error", errors: error.issues });
            }

            console.error("Error deleting secretary:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    public async updateSecretary(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = updateSecretaryBodySchema.parse(req.body);
        const { id } = updateSecretaryParamsSchema.parse(req.params);
        const { id: userId } = authenticatedUserSchema.parse({ id: req.user?.id });

        try {
            const result = await this.secretaryService.update(id, name, email, password, userId);
            return res.status(200).json({ secretary: result });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation error", errors: error.issues });
            }

            console.error("Error updating secretary:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    public async listSecretary(req: Request, res: Response): Promise<Response> {
        const { id } = listSecretaryParamsSchema.parse(req.params);

        try {
            const result = await this.secretaryService.list(id);
            return res.status(200).json({ secretary: result });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: "Validation error", errors: error.issues });
            }

            console.error("Error updating secretary:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    
    public async listSecretaries(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.secretaryService.listAll();
            return res.status(200).json({ secretaries: result });
        } catch (error) {
            console.error("Error listing secretaries:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


}