import {SecretaryService} from "../service/SecretaryService";
import { ISecretaryRepository } from "../domain/repository/ISecretaryRepository";
import { IAdminRepository } from "../../admin/domain/repository/IAdminRepository";
import { Request, Response, NextFunction } from 'express';
import { authenticatedUserSchema } from "../schema/secretarySchema";
import { registerSecretaryBodySchema } from "../schema/registerSchema";
import { deleteSecretaryParamsSchema, deleteSecretaryBodySchema } from "../schema/deleteSchema";
import { updateSecretaryParamsSchema, updateSecretaryBodySchema } from "../schema/updateSchema";
import { listSecretaryParamsSchema, listSecretaryQuerySchema } from "../schema/listSchema";

export class SecretaryController {

    constructor(secretaryRepository: ISecretaryRepository,
                adminRepository: IAdminRepository,
                private secretaryService: SecretaryService = new SecretaryService(secretaryRepository, adminRepository)
    ) {}

    public async registerSecretary(req: Request, res: Response, next: NextFunction) : Promise<Response|void> {
        try{
            const { name, email, password } = registerSecretaryBodySchema.parse(req.body);
            const result = await this.secretaryService.create(name, email, password);

            return res.status(201).json({ secretary: result });
        } catch (error) {
            return next(error);
        }
    }


    public async deleteSecretary(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
        try{
            const { adminPassword } = deleteSecretaryBodySchema.parse(req.body);
            const { id } = deleteSecretaryParamsSchema.parse(req.params);
            const { id: userId } = authenticatedUserSchema.parse({ id: req.user?.id });
            await this.secretaryService.delete(id, adminPassword, userId);

            return res.status(200).json({ message: 'Ok' });
        } catch (error) {
            return next(error);
        }
    }


    public async updateSecretary(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try{
            const { name, email, password, currentPassword } = updateSecretaryBodySchema.parse(req.body);
            const { id } = updateSecretaryParamsSchema.parse(req.params);
            const { id: userId } = authenticatedUserSchema.parse({ id: req.user?.id });
            const userRole = req.user?.role || '';
            const result = await this.secretaryService.update(id, name, email, password, userId, userRole, currentPassword);
            
            return res.status(200).json({ secretary: result });
        } catch (error) {
            return next(error);
        }
    }


    public async listSecretary(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try{
            const { id } = listSecretaryParamsSchema.parse(req.params);
            const result = await this.secretaryService.list(id);
            
            return res.status(200).json({ secretary: result });
        } catch (error) {
            return next(error);
        }
    }

    
    public async listSecretaries(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        try{
            const { page, limit } = listSecretaryQuerySchema.parse(req.query);
            const result = await this.secretaryService.listAll(page, limit);
            
            return res.status(200).json({ secretaries: result });
        } catch (error) {
            return next(error);
        }
    }
}