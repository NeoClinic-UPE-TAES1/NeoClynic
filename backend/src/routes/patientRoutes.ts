import { Router, Request, Response } from 'express';
import { PatientController } from '../modules/patient/controller/PatientController';
import { PatientRepository } from '../modules/patient/domain/repository/PatientRepository';
import { ObservationRepository } from '../modules/observation/domain/repository/ObservationRepository';
import { authenticateToken, authorizeRoles } from '../infra/middlewares/authMiddleware';
import { JWTProvider } from '../infra/providers/auth/JWTProvider'; 
import { SecretaryRepository } from '../modules/secretary/domain/repository/SecretaryRepository';

const patientRoutes = Router();

const patientRepository = new PatientRepository();
const observationRepository = new ObservationRepository();
const secretaryRepository = new SecretaryRepository();
const patientController = new PatientController(patientRepository, observationRepository, secretaryRepository);
const jwtProvider = new JWTProvider();

patientRoutes.use(authenticateToken(jwtProvider));

patientRoutes.post('/patient/register', authorizeRoles('SECRETARY'), (req: Request, res: Response) => {
    patientController.registerPatient(req, res) });

patientRoutes.get('/patient/list/:id', authorizeRoles('SECRETARY', 'MEDIC'), (req: Request, res: Response) => {
    patientController.listPatient(req, res);  });

patientRoutes.get('/patient/list', authorizeRoles('SECRETARY', 'MEDIC'), (req: Request, res: Response) => {
    patientController.listPatients(req, res);  });

patientRoutes.patch('/patient/update/:id', authorizeRoles('SECRETARY'), (req: Request, res: Response) => {
    patientController.updatePatient(req, res) });

patientRoutes.delete('/patient/delete/:id', authorizeRoles('SECRETARY'), (req: Request, res: Response) => {
    patientController.deletePatient(req, res) });

export default patientRoutes;