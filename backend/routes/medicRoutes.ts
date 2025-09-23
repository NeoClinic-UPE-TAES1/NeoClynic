import { Router, Request, Response } from 'express';
import { MedicController } from '../src/controller/MedicController';
import { MedicRepository } from '../src/domain/repository/MedicRepository';

const medicRoutes = Router();

const medicController = new MedicController();
const medicRepository = new MedicRepository();

medicRoutes.post('/medic/register', (req: Request, res: Response) => {
    medicController.registerMedic(req, res, medicRepository) });

medicRoutes.get('/medic/list/:id', (req: Request, res: Response) => {
    medicController.listMedic(req, res, medicRepository);  });

medicRoutes.get('/medic/list', (req: Request, res: Response) => {
    medicController.listMedics(req, res, medicRepository);  });

medicRoutes.patch('/medic/update/:id', (req: Request, res: Response) => {
    medicController.updateMedic(req, res, medicRepository) });

medicRoutes.delete('/medic/delete/:id', (req: Request, res: Response) => {
    medicController.deleteMedic(req, res, medicRepository) });

export default medicRoutes;