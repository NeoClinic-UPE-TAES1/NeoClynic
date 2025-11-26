import { PatientService } from "../service/PatientService";
import { IPatientRepository } from "../domain/repository/IPatientRepository";
import { IObservationRepository } from "../../observation/domain/repository/IObservationRepository";
import { ISecretaryRepository } from "../../secretary/domain/repository/ISecretaryRepository";
import { NextFunction, Request, Response } from "express";
import { registerPatientBodySchema } from "../schema/registerSchema";
import { deletePatientBodySchema, deletePatientParamsSchema, deletePatientAuthSchema } from "../schema/deleteSchema";
import { updatePatientParamsSchema, updatePatientBodySchema } from "../schema/updateSchema";
import { listPatientParamsSchema, listPatientAuthSchema, listPatientQuerySchema } from "../schema/listSchema";

export class PatientController {
  constructor(patientRepository: IPatientRepository,
              observationRepository: IObservationRepository,
              secretaryRepository: ISecretaryRepository,
              private patientService: PatientService = new PatientService(patientRepository, observationRepository, secretaryRepository),
  ) {}

  public async registerPatient(req: Request, res: Response, next:NextFunction): Promise<Response|void> {
    try{
      const { name, birthDay, sex, cpf, ethnicity, email, observation } = registerPatientBodySchema.parse(req.body);
      const result = await this.patientService.create(name, birthDay, sex, cpf, ethnicity, email, observation);

      return res.status(201).json({ patient: result });
      } catch (error) {
            return next(error);
        }
  }

  public async deletePatient(req: Request, res: Response, next:NextFunction): Promise<Response|void> {
    try { 
      const { id } = deletePatientParamsSchema.parse(req.params);
      const { secretaryPassword } = deletePatientBodySchema.parse(req.body);
      const { userId } = deletePatientAuthSchema.parse({
        userId: req.user?.id,
      });
      await this.patientService.delete(id, secretaryPassword, userId);

      return res.status(200).json({ message: "Ok" });
    } catch (error) {
          return next(error);
      }
  }

  public async updatePatient(req: Request, res: Response, next:NextFunction): Promise<Response|void> {
    try{
      const { id } = updatePatientParamsSchema.parse(req.params);
      const { name, birthDay, sex, cpf, ethnicity, email, observation } = updatePatientBodySchema.parse(req.body);
      const result = await this.patientService.update(id, name, birthDay, sex, cpf, ethnicity, email, observation);

      return res.status(200).json({ patient: result });
      } catch (error) {
            return next(error);
        }
  }

  public async listPatient(req: Request, res: Response, next:NextFunction): Promise<Response|void> {
    try{
      const { id } = listPatientParamsSchema.parse(req.params);
      const { userId, userRole } = listPatientAuthSchema.parse({
        userId: req.user?.id,
        userRole: req.user?.role,
      });
      const result = await this.patientService.list(id, userId, userRole);

      return res.status(200).json({ patient: result });
      } catch (error) {
            return next(error);
        }
  }

  public async listPatients(req: Request, res: Response, next:NextFunction): Promise<Response|void> {
    try{
      const { userId, userRole } = listPatientAuthSchema.parse({
        userId: req.user?.id,
        userRole: req.user?.role,
      });

      const { page, limit } = listPatientQuerySchema.parse(req.query);
      const result = await this.patientService.listAll(userId, userRole, page, limit);
      
      return res.status(200).json({ patients: result });
      } catch (error) {
            return next(error);
        }
  }
}
