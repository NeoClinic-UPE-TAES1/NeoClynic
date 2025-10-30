import { Router, Request, Response } from 'express';
import { ConsultationController } from '../modules/consultation/controller/ConsultationController';
import { ConsultationRepository } from '../modules/consultation/domain/repository/ConsultationRepository';
import { ReportRepository } from '../modules/report/domain/repository/ReportRepository';
import { PatientRepository } from '../modules/patient/domain/repository/PatientRepository';
import { MedicRepository } from '../modules/medic/domain/repository/MedicRepository';
import { authenticateToken } from '../infra/middlewares/authMiddleware';
import { JWTProvider } from '../infra/providers/auth/JWTProvider'; 

const consultationRoutes = Router();

const reportRepository = new ReportRepository();
const consultationRepository = new ConsultationRepository();
const patientRepository = new PatientRepository();
const medicRepository = new MedicRepository();
const consultationController = new ConsultationController(consultationRepository, reportRepository, patientRepository, medicRepository);
const jwtProvider = new JWTProvider();

consultationRoutes.use(authenticateToken(jwtProvider));

consultationRoutes.post('/consultation/register', (req: Request, res: Response) => {
    consultationController.registerConsultation(req, res) });

consultationRoutes.get('/consultation/list/:id', (req: Request, res: Response) => {
    consultationController.listConsultation(req, res);  });

consultationRoutes.get('/consultation/list', (req: Request, res: Response) => {
    consultationController.listConsultations(req, res);  });

consultationRoutes.patch('/consultation/update/:id', (req: Request, res: Response) => {
    consultationController.updateConsultation(req, res) });

consultationRoutes.delete('/consultation/delete/:id', (req: Request, res: Response) => {
    consultationController.deleteConsultation(req, res) });

export default consultationRoutes;