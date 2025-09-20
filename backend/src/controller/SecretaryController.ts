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


}