import { Router, Request, Response } from 'express';
import { authenticateToken } from '../infra/middlewares/authMiddleware';
import { JWTProvider } from '../infra/providers/auth/JWTProvider';
import { SecretaryController } from '../modules/secretary/controller/SecretaryController';
import { SecretaryRepository } from '../modules/secretary/domain/repository/SecretaryRepository';
import { AuthSecretaryController } from '../modules/secretary/controller/AuthSecretaryController';

const secretaryRoutes = Router();

const jwtProvider = new JWTProvider();
const secretaryRepository = new SecretaryRepository();
const secretaryController = new SecretaryController(secretaryRepository);
const authSecretaryController = new AuthSecretaryController(secretaryRepository, jwtProvider);

secretaryRoutes.post('/secretary/register', (req: Request, res: Response) => {
    secretaryController.registerSecretary(req, res) });

secretaryRoutes.post('/secretary/login', (req: Request, res: Response) => {
    authSecretaryController.login(req, res) });

secretaryRoutes.get('/secretary/list/:id', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    secretaryController.listSecretary(req, res);  });

secretaryRoutes.get('/secretary/list', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    secretaryController.listSecretaries(req, res);  });

secretaryRoutes.patch('/secretary/update/:id', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    secretaryController.updateSecretary(req, res) });

secretaryRoutes.delete('/secretary/delete/:id', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    secretaryController.deleteSecretary(req, res) });

export default secretaryRoutes;