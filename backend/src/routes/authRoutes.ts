import { Router, Request, Response, NextFunction } from 'express';
import { JWTProvider } from '../infra/providers/auth/JWTProvider';
import { AdminRepository } from '../modules/admin/domain/repository/AdminRepository';
import { SecretaryRepository } from '../modules/secretary/domain/repository/SecretaryRepository';
import { MedicRepository } from '../modules/medic/domain/repository/MedicRepository';
import { AuthAdminController } from '../modules/admin/controller/AuthAdminController';
import { AuthSecretaryController } from '../modules/secretary/controller/AuthSecretaryController';
import { AuthMedicController } from '../modules/medic/controller/AuthMedicController';
import { NodemailerProvider } from '../infra/providers/email/NodeMailerProvider';

const authRoutes = Router();

const jwtProvider = new JWTProvider();
const emailProvider = new NodemailerProvider();
const adminRepository = new AdminRepository();
const secretaryRepository = new SecretaryRepository();
const medicRepository = new MedicRepository();
const authAdminController = new AuthAdminController(adminRepository, jwtProvider, emailProvider);
const authSecretaryController = new AuthSecretaryController(secretaryRepository, jwtProvider, emailProvider);
const authMedicController = new AuthMedicController(medicRepository, jwtProvider, emailProvider);

// Admin
authRoutes.post('/admin/login', (req: Request, res: Response, next: NextFunction) => {
    authAdminController.login(req, res, next) });

authRoutes.post('/admin/password/request', (req: Request, res: Response, next: NextFunction) => {
        authAdminController.request(req, res, next) });

authRoutes.post('/admin/password/reset', (req: Request, res: Response, next: NextFunction) => {
            authAdminController.reset(req, res, next) });

// Secretary
authRoutes.post('/secretary/login', (req: Request, res: Response, next:NextFunction) => {
    authSecretaryController.login(req, res, next) });

authRoutes.post('/secretary/password/request', (req: Request, res: Response, next:NextFunction) => {
    authSecretaryController.request(req, res, next) });

authRoutes.post('/secretary/password/reset', (req: Request, res: Response, next:NextFunction) => {
            authSecretaryController.reset(req, res, next) });

// Medic
authRoutes.post('/medic/login', (req: Request, res: Response, next: NextFunction) => {
    authMedicController.login(req, res, next) });

authRoutes.post('/medic/password/request', (req: Request, res: Response, next: NextFunction) => {
    authMedicController.request(req, res, next) });

authRoutes.post('/medic/password/reset', (req: Request, res: Response, next: NextFunction) => {
        authMedicController.reset(req, res, next) });


export default authRoutes;