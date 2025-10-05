import { MedicService } from "../service/MedicService";
import { IMedicRepository } from "../domain/repository/IMedicRepository";
import { Request, Response } from "express";

export class MedicController {
  constructor(private medicRepository: IMedicRepository,
              private medicService: MedicService = new MedicService(medicRepository)
  ) {}

  public async registerMedic(req: Request, res: Response): Promise<Response> {
    const { name, email, password, specialty } = req.body;

    try {
      const result = await this.medicService.create(name, email, password, specialty);
      return res.status(201).json({ medic: result });
    } catch (error) {
      console.error("Error registering medic:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteMedic(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { password } = req.body;

    try {
      await this.medicService.delete(id, password);
      return res.status(200).json({ message: "Ok" });
    } catch (error) {
      console.error("Error deleting medic:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async updateMedic(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password, specialty } = req.body;

    try {
      const result = await this.medicService.update(id, name, email, password, specialty);
      return res.status(200).json({ medic: result });
    } catch (error) {
      console.error("Error updating medic:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listMedic(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const result = await this.medicService.listOne(id);
      return res.status(200).json({ medic: result });
    } catch (error) {
      console.error("Error listing medic:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async listMedics(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.medicService.listAll();
      return res.status(200).json({ medics: result });
    } catch (error) {
      console.error("Error listing medics:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
