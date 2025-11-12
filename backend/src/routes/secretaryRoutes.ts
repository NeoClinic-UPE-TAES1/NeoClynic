import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken, authorizeRoles } from '../infra/middlewares/authMiddleware';
import { JWTProvider } from '../infra/providers/auth/JWTProvider';
import { SecretaryController } from '../modules/secretary/controller/SecretaryController';
import { SecretaryRepository } from '../modules/secretary/domain/repository/SecretaryRepository';
import { AuthSecretaryController } from '../modules/secretary/controller/AuthSecretaryController';
import { NodemailerProvider } from '../infra/providers/email/NodeMailerProvider';
import { AdminRepository } from '../modules/admin/domain/repository/AdminRepository';

const secretaryRoutes = Router();

const jwtProvider = new JWTProvider();
const emailProvider = new NodemailerProvider();
const secretaryRepository = new SecretaryRepository();
const adminRepository = new AdminRepository();
const secretaryController = new SecretaryController(secretaryRepository, adminRepository);
const authSecretaryController = new AuthSecretaryController(secretaryRepository, jwtProvider, emailProvider);

secretaryRoutes.post('/secretary/register', authorizeRoles('ADMIN'), (req: Request, res: Response, next:NextFunction) => {
    secretaryController.registerSecretary(req, res, next) });

secretaryRoutes.post('/secretary/login', (req: Request, res: Response, next:NextFunction) => {
    authSecretaryController.login(req, res, next) });

secretaryRoutes.get('/secretary/list/:id', authenticateToken(jwtProvider), authorizeRoles('ADMIN'), (req: Request, res: Response, next:NextFunction) => {
    secretaryController.listSecretary(req, res, next);  });

secretaryRoutes.get('/secretary/list', authenticateToken(jwtProvider), authorizeRoles('ADMIN'), (req: Request, res: Response, next:NextFunction) => {
    secretaryController.listSecretaries(req, res, next);  });

secretaryRoutes.patch('/secretary/update/:id', authenticateToken(jwtProvider), authorizeRoles('ADMIN', 'SECRETARY'), (req: Request, res: Response, next:NextFunction) => {
    secretaryController.updateSecretary(req, res, next) });

secretaryRoutes.delete('/secretary/delete/:id', authenticateToken(jwtProvider), authorizeRoles('ADMIN'), (req: Request, res: Response, next:NextFunction) => {
    secretaryController.deleteSecretary(req, res, next) });

secretaryRoutes.post('/secretary/password/request', (req: Request, res: Response, next:NextFunction) => {
        authSecretaryController.request(req, res, next) });

secretaryRoutes.post('/secretary/password/reset', (req: Request, res: Response, next:NextFunction) => {
            authSecretaryController.reset(req, res, next) });

export default secretaryRoutes;