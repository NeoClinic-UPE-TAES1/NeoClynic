import { MedicService } from "../service/MedicService";
import { IMedicRepository } from "../domain/repository/IMedicRepository";
import { Request, Response } from "express";

export class MedicController {
  public async registerMedic(req: Request, res: Response, medicRepository: IMedicRepository): Promise<Response> {
    const { name, email, password, specialty } = req.body;

    try {
      const result = await MedicService.create(name, email, password, specialty, medicRepository);
      return res.status(201).json({ medic: result });
    } catch (error) {
      console.error("Error registering medic:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteMedic(req: Request, res: Response, medicRepository: IMedicRepository): Promise<Response> {
    const { id } = req.params;
    const { password } = req.body;

    try {
      await MedicService.delete(id, password, medicRepository);
      return res.status(200).json({ message: "Ok" });
    } catch (error) {
      console.error("Error deleting medic:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async updateMedic(req: Request, res: Response, medicRepository: IMedicRepository): Promise<Response> {
    const { id } = req.params;
    const { name, email, password, specialty } = req.body;

    try {
      const result = await MedicService.update(id, name, email, password, specialty, medicRepository);
      return res.status(200).json({ medic: result });
    } catch (error) {
      console.error("Error updating medic:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listMedic(req: Request, res: Response, medicRepository: IMedicRepository): Promise<Response> {
    const { id } = req.params;

    try {
      const result = await MedicService.listOne(id, medicRepository);
      return res.status(200).json({ medic: result });
    } catch (error) {
      console.error("Error listing medic:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listMedics(req: Request, res: Response, medicRepository: IMedicRepository): Promise<Response> {
    try {
      const result = await MedicService.listAll(medicRepository);
      return res.status(200).json({ medics: result });
    } catch (error) {
      console.error("Error listing medics:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
