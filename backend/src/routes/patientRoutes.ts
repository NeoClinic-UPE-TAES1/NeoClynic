import { Router, Request, Response } from 'express';
import { authenticateToken } from '../infra/middlewares/authMiddleware';
import { JWTProvider } from '../infra/providers/auth/JWTProvider';
import { PatientController } from '../modules/patient/controller/PatientController';
import { PatientRepository } from '../modules/patient/domain/repository/PatientRepository';

const patientRoutes = Router();

const jwtProvider = new JWTProvider();
const patientRepository = new PatientRepository();
const patientController = new PatientController(patientRepository);

patientRoutes.post('/patient/create', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    patientController.createPatient(req, res);
});

patientRoutes.get('/patient/list/:id', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    patientController.listPatient(req, res);
});

patientRoutes.get('/patient/list', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    patientController.listPatients(req, res);
});

patientRoutes.patch('/patient/update/:id', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    patientController.updatePatient(req, res);
});

patientRoutes.patch('/patient/observation/:id', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    patientController.updateObservation(req, res);
});

patientRoutes.delete('/patient/delete/:id', authenticateToken(jwtProvider), (req: Request, res: Response) => {
    patientController.deletePatient(req, res);
});

export default patientRoutes;