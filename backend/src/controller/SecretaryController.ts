import {SecretaryService} from "../service/SecretaryService";
import { ISecretaryRepository } from "../domain/repository/ISecretaryRepository";
import { Router, Request, Response } from 'express';

export class SecretaryController {

    public async registerSecretary(req: Request, res: Response, secretaryRepository: ISecretaryRepository): Promise<Response> {
        const { name, email, password } = req.body;

        try{
            const result = await SecretaryService.create(name, email, password, secretaryRepository);
            return res.status(201).json({ secretary: result });

        } catch (error) {
            console.error('Error registering secretary:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async deleteSecretary(req: Request, res: Response, secretaryRepository: ISecretaryRepository):Promise<Response>{
        const { id } = req.params;
        const { password } = req.body

        try{
            await SecretaryService.delete(id, password, secretaryRepository);
            return res.status(200).json({ message: 'Ok' });

        } catch (error) {
            console.error('Error registering secretary:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }



    public async updateSecretary(req: Request, res: Response, secretaryRepository: ISecretaryRepository): Promise<Response> {
        const { id } = req.params;
        const { name, email, password } = req.body;

        try {
            const result = await SecretaryService.update(id, name, email, password, secretaryRepository);
            return res.status(200).json({ secretary: result });
        } catch (error) {
            console.error("Error updating secretary:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }




    public async listSecretary(req: Request, res: Response, secretaryRepository: ISecretaryRepository): Promise<Response> {
        const { id } = req.params;

        try {
            const result = await SecretaryService.listOne(id, secretaryRepository);
            return res.status(200).json({ secretary: result });
        } catch (error) {
            console.error("Error listing secretary:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    public async listSecretaries(req: Request, res: Response, secretaryRepository: ISecretaryRepository): Promise<Response> {
        try {
            const result = await SecretaryService.listAll(secretaryRepository);
            return res.status(200).json({ secretaries: result });
        } catch (error) {
            console.error("Error listing secretaries:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


}