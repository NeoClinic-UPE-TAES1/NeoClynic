import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken, authorizeRoles } from '../infra/middlewares/authMiddleware';
import { JWTProvider } from '../infra/providers/auth/JWTProvider'; 
import { MedicController } from '../modules/medic/controller/MedicController';
import { MedicRepository } from '../modules/medic/domain/repository/MedicRepository';
import { AdminRepository } from '../modules/admin/domain/repository/AdminRepository';
import { AuthMedicController } from '../modules/medic/controller/AuthMedicController';
import { NodemailerProvider } from '../infra/providers/email/NodeMailerProvider';

const medicRoutes = Router();

const jwtProvider = new JWTProvider();
const emailProvider = new NodemailerProvider();
const medicRepository = new MedicRepository();
const adminRepository = new AdminRepository();
const medicController = new MedicController(medicRepository, adminRepository);

medicRoutes.post('/medic/register', authorizeRoles('ADMIN', 'SECRETARY'), (req: Request, res: Response, next: NextFunction) => {
    medicController.registerMedic(req, res, next) });

medicRoutes.get('/medic/list/:id', authenticateToken(jwtProvider), authorizeRoles('ADMIN', 'SECRETARY'), (req: Request, res: Response, next: NextFunction) => {
    medicController.listMedic(req, res, next);  });

medicRoutes.get('/medic/list', authenticateToken(jwtProvider), authorizeRoles('ADMIN', 'SECRETARY'), (req: Request, res: Response, next: NextFunction) => {
    medicController.listMedics(req, res, next);  });

medicRoutes.patch('/medic/update/:id', authenticateToken(jwtProvider), authorizeRoles('ADMIN', 'MEDIC'), (req: Request, res: Response, next: NextFunction) => {
    medicController.updateMedic(req, res, next) });

medicRoutes.delete('/medic/delete/:id', authenticateToken(jwtProvider), authorizeRoles('ADMIN'), (req: Request, res: Response, next: NextFunction) => {
    medicController.deleteMedic(req, res, next) });

export default medicRoutes;