import { PatientService } from "../service/PatientService";
import { IPatientRepository } from "../domain/repository/IPatientRepository";
import { Router, Request, Response } from 'express';

export class PatientController {

    constructor(patientRepository: IPatientRepository,
                private patientService: PatientService = new PatientService(patientRepository)
    ) {}

    public async createPatient(req: Request, res: Response): Promise<Response> {
        const { name, birthDay, sex, cpf, ethnicity, email } = req.body;

        try {
            // Converter birthDay string para Date
            const birthDayDate = new Date(birthDay);
            
            // Validar se a data é válida
            if (isNaN(birthDayDate.getTime())) {
                return res.status(400).json({ message: 'Invalid birthDay format' });
            }
            
            const result = await this.patientService.create(
                name, 
                birthDayDate, 
                sex, 
                cpf, 
                ethnicity, 
                email || undefined
            );
            return res.status(201).json({ patient: result });
        } catch (error: any) {
            console.error('Error creating patient:', error);
            
            // Retornar mensagem de erro mais específica
            if (error.message) {
                return res.status(400).json({ message: error.message });
            }
            
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async listPatient(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const result = await this.patientService.list(id);
            return res.status(200).json({ patient: result });
        } catch (error) {
            console.error('Error listing patient:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async listPatients(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.patientService.listAll();
            return res.status(200).json({ patients: result });
        } catch (error) {
            console.error('Error listing patients:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async updatePatient(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, birthDay, sex, cpf, ethnicity, email } = req.body;

        try {
            // Converter birthDay string para Date
            const birthDayDate = new Date(birthDay);
            
            // Validar se a data é válida
            if (isNaN(birthDayDate.getTime())) {
                return res.status(400).json({ message: 'Invalid birthDay format' });
            }
            
            const result = await this.patientService.update(
                id, 
                name, 
                birthDayDate, 
                sex, 
                cpf, 
                ethnicity, 
                email || undefined
            );
            return res.status(200).json({ patient: result });
        } catch (error: any) {
            console.error('Error updating patient:', error);
            
            // Retornar mensagem de erro mais específica
            if (error.message) {
                return res.status(400).json({ message: error.message });
            }
            
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async updateObservation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { comorbidity, allergies, medications } = req.body;

        try {
            await this.patientService.updateObservation(id, comorbidity, allergies, medications);
            return res.status(200).json({ message: 'Observation updated' });
        } catch (error) {
            console.error('Error updating observation:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async deletePatient(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            await this.patientService.delete(id);
            return res.status(200).json({ message: 'Patient deleted' });
        } catch (error: any) {
            console.error('Error deleting patient:', error);
            
            // Retornar mensagem de erro mais específica
            if (error.message) {
                return res.status(400).json({ message: error.message });
            }
            
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}