import { Router, Request, Response, NextFunction } from 'express';
import { ConsultationController } from '../modules/consultation/controller/ConsultationController';
import { ConsultationRepository } from '../modules/consultation/domain/repository/ConsultationRepository';
import { ReportRepository } from '../modules/report/domain/repository/ReportRepository';
import { PatientRepository } from '../modules/patient/domain/repository/PatientRepository';
import { SecretaryRepository } from '../modules/secretary/domain/repository/SecretaryRepository';
import { MedicRepository } from '../modules/medic/domain/repository/MedicRepository';
import { authenticateToken, authorizeRoles } from '../infra/middlewares/authMiddleware';
import { JWTProvider } from '../infra/providers/auth/JWTProvider'; 

const consultationRoutes = Router();

const reportRepository = new ReportRepository();
const consultationRepository = new ConsultationRepository();
const patientRepository = new PatientRepository();
const medicRepository = new MedicRepository();
const secretaryRepository = new SecretaryRepository();
const consultationController = new ConsultationController(consultationRepository, reportRepository, patientRepository, medicRepository, secretaryRepository);
const jwtProvider = new JWTProvider();

consultationRoutes.use(authenticateToken(jwtProvider));

consultationRoutes.post('/consultation/register', authorizeRoles('SECRETARY', 'MEDIC'), (req: Request, res: Response, next: NextFunction) => {
    consultationController.registerConsultation(req, res, next) });

consultationRoutes.get('/consultation/list/:id', authorizeRoles('SECRETARY', 'MEDIC'), (req: Request, res: Response, next: NextFunction) => {
    consultationController.listConsultation(req, res, next);  });

consultationRoutes.get('/consultation/list', authorizeRoles('SECRETARY', 'MEDIC'), (req: Request, res: Response, next: NextFunction) => {
    consultationController.listConsultations(req, res, next);  });

consultationRoutes.patch('/consultation/update/:id', authorizeRoles('SECRETARY', 'MEDIC'), (req: Request, res: Response, next: NextFunction) => {
    consultationController.updateConsultation(req, res, next) });

consultationRoutes.delete('/consultation/delete/:id', authorizeRoles('SECRETARY'), (req: Request, res: Response, next: NextFunction) => {
    consultationController.deleteConsultation(req, res, next) });

export default consultationRoutes;