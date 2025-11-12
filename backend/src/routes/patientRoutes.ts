import { Router, Request, Response, NextFunction } from 'express';
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

patientRoutes.post('/patient/register', authorizeRoles('SECRETARY'), (req: Request, res: Response, next: NextFunction) => {
    patientController.registerPatient(req, res, next) });

patientRoutes.get('/patient/list/:id', authorizeRoles('SECRETARY', 'MEDIC'), (req: Request, res: Response, next: NextFunction) => {
    patientController.listPatient(req, res, next);  });

patientRoutes.get('/patient/list', authorizeRoles('SECRETARY', 'MEDIC'), (req: Request, res: Response, next: NextFunction) => {
    patientController.listPatients(req, res, next);  });

patientRoutes.patch('/patient/update/:id', authorizeRoles('SECRETARY'), (req: Request, res: Response, next: NextFunction) => {
    patientController.updatePatient(req, res, next) });

patientRoutes.delete('/patient/delete/:id', authorizeRoles('SECRETARY'), (req: Request, res: Response, next: NextFunction) => {
    patientController.deletePatient(req, res, next) });

export default patientRoutes;