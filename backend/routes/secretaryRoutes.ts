import { Router, Request, Response } from 'express';
import { SecretaryController } from '../src/modules/secretary/controller/SecretaryController';
import { SecretaryRepository } from '../src/modules/secretary/domain/repository/SecretaryRepository';

const secretaryRoutes = Router();

const secretaryRepository = new SecretaryRepository();
const secretaryController = new SecretaryController(secretaryRepository);

secretaryRoutes.post('/secretary/register', (req: Request, res: Response) => {
    secretaryController.registerSecretary(req, res) });

secretaryRoutes.get('/secretary/list/:id', (req: Request, res: Response) => {
    secretaryController.listSecretary(req, res);  });

secretaryRoutes.get('/secretary/list', (req: Request, res: Response) => {
    secretaryController.listSecretaries(req, res);  });

secretaryRoutes.patch('/secretary/update/:id', (req: Request, res: Response) => {
    secretaryController.updateSecretary(req, res) });

secretaryRoutes.delete('/secretary/delete/:id', (req: Request, res: Response) => {
    secretaryController.deleteSecretary(req, res) });

export default secretaryRoutes;