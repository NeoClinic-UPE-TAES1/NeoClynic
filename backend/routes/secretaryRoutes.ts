import { Router, Request, Response } from 'express';
import { SecretaryController } from '../src/controller/SecretaryController';
import { SecretaryRepository } from '../src/domain/repository/SecretaryRepository';

const secretaryRoutes = Router();

const secretaryController = new SecretaryController();
const secretaryRepository = new SecretaryRepository();

secretaryRoutes.post('/secretary/register', (req: Request, res: Response) => {
    secretaryController.registerSecretary(req, res, secretaryRepository) });

secretaryRoutes.get('/secretary/list/:id', (req: Request, res: Response) => {
    secretaryController.listSecretary(req, res, secretaryRepository);  });

secretaryRoutes.get('/secretary/list', (req: Request, res: Response) => {
    secretaryController.listSecretaries(req, res, secretaryRepository);  });

secretaryRoutes.patch('/secretary/update/:id', (req: Request, res: Response) => {
    secretaryController.updateSecretary(req, res, secretaryRepository) });

secretaryRoutes.delete('/secretary/delete/:id', (req: Request, res: Response) => {
    secretaryController.deleteSecretary(req, res, secretaryRepository) });

export default secretaryRoutes;