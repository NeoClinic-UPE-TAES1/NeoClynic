import { Router, Request, Response } from 'express';
import { authenticateToken } from '../infra/middlewares/authMiddleware';
import { JWTProvider } from '../infra/providers/auth/JWTProvider'; 
import { MedicController } from '../modules/medic/controller/MedicController';
import { MedicRepository } from '../modules/medic/domain/repository/MedicRepository';

const medicRoutes = Router();

const jwtProvider = new JWTProvider();
const medicRepository = new MedicRepository();
const medicController = new MedicController(medicRepository);

medicRoutes.post('/medic/register', (req: Request, res: Response) => {
    medicController.registerMedic(req, res) });

medicRoutes.get('/medic/list/:id', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    medicController.listMedic(req, res);  });

medicRoutes.get('/medic/list', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    medicController.listMedics(req, res);  });

medicRoutes.patch('/medic/update/:id', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    medicController.updateMedic(req, res) });

medicRoutes.delete('/medic/delete/:id', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    medicController.deleteMedic(req, res) });

export default medicRoutes;