import e, { Router, Request, Response } from 'express';
import { authenticateToken, authorizeRoles } from '../infra/middlewares/authMiddleware';
import { JWTProvider } from '../infra/providers/auth/JWTProvider'; 
import { AdminController } from '../modules/admin/controller/AdminController';
import { AdminRepository } from '../modules/admin/domain/repository/AdminRepository';
import { AuthAdminController } from '../modules/admin/controller/AuthAdminController';
import { NodemailerProvider } from '../infra/providers/email/NodeMailerProvider';

const adminRoutes = Router();

const jwtProvider = new JWTProvider();
const emailProvider = new NodemailerProvider();
const adminRepository = new AdminRepository();
const adminController = new AdminController(adminRepository);
const authAdminController = new AuthAdminController(adminRepository, jwtProvider, emailProvider);

adminRoutes.post('/admin/login', (req: Request, res: Response) => {
    authAdminController.login(req, res) });

adminRoutes.post('/admin/password/request', (req: Request, res: Response) => {
        authAdminController.request(req, res) });

adminRoutes.post('/admin/password/reset', (req: Request, res: Response) => {
            authAdminController.reset(req, res) });

adminRoutes.patch('/admin/update/:id', authenticateToken(jwtProvider), authorizeRoles('ADMIN'), (req: Request, res: Response) => {
    adminController.updateAdmin(req, res) });

export default adminRoutes;