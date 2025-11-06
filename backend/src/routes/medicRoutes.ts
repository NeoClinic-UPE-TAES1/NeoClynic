import { Router, Request, Response } from 'express';
import { authenticateToken, authorizeRoles } from '../infra/middlewares/authMiddleware';
import { JWTProvider } from '../infra/providers/auth/JWTProvider'; 
import { MedicController } from '../modules/medic/controller/MedicController';
import { MedicRepository } from '../modules/medic/domain/repository/MedicRepository';
import { AuthMedicController } from '../modules/medic/controller/AuthMedicController';
import { NodemailerProvider } from '../infra/providers/email/NodeMailerProvider';

const medicRoutes = Router();

const jwtProvider = new JWTProvider();
const emailProvider = new NodemailerProvider();
const medicRepository = new MedicRepository();
const medicController = new MedicController(medicRepository);
const authMedicController = new AuthMedicController(medicRepository, jwtProvider, emailProvider);

medicRoutes.post('/medic/register', authorizeRoles('ADMIN', 'SECRETARY'), (req: Request, res: Response) => {
    medicController.registerMedic(req, res) });

medicRoutes.post('/medic/login', (req: Request, res: Response) => {
    authMedicController.login(req, res) });

medicRoutes.get('/medic/list/:id', authenticateToken(jwtProvider), authorizeRoles('ADMIN', 'SECRETARY'), (req: Request, res: Response) => {
    medicController.listMedic(req, res);  });

medicRoutes.get('/medic/list', authenticateToken(jwtProvider), authorizeRoles('ADMIN', 'SECRETARY'), (req: Request, res: Response) => {
    medicController.listMedics(req, res);  });

medicRoutes.patch('/medic/update/:id', authenticateToken(jwtProvider), authorizeRoles('ADMIN', 'MEDIC'), (req: Request, res: Response) => {
    medicController.updateMedic(req, res) });

medicRoutes.delete('/medic/delete/:id', authenticateToken(jwtProvider), authorizeRoles('ADMIN'), (req: Request, res: Response) => {
    medicController.deleteMedic(req, res) });

export default medicRoutes;