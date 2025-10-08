import { Router, Request, Response } from 'express';
import { PatientController } from '../modules/patient/controller/PatientController';
import { PatientRepository } from '../modules/patient/domain/repository/PatientRepository';
import { ObservationRepository } from '../modules/observation/domain/repository/ObservationRepository';
import { authenticateToken } from '../infra/middlewares/authMiddleware';
import { JWTProvider } from '../infra/providers/auth/JWTProvider'; 

const patientRoutes = Router();

const patientRepository = new PatientRepository();
const observationRepository = new ObservationRepository();
const patientController = new PatientController(patientRepository, observationRepository);
const jwtProvider = new JWTProvider();

patientRoutes.use(authenticateToken(jwtProvider));

patientRoutes.post('/patient/register', (req: Request, res: Response) => {
    patientController.registerPatient(req, res) });

patientRoutes.get('/patient/list/:id', (req: Request, res: Response) => {
    patientController.listPatient(req, res);  });

patientRoutes.get('/patient/list', (req: Request, res: Response) => {
    patientController.listPatients(req, res);  });

patientRoutes.patch('/patient/update/:id', (req: Request, res: Response) => {
    patientController.updatePatient(req, res) });

patientRoutes.delete('/patient/delete/:id', (req: Request, res: Response) => {
    patientController.deletePatient(req, res) });

export default patientRoutes;