import { IMedicRepository } from "../domain/repository/IMedicRepository";
import { CreateMedicRequest } from "../dto/CreateMedicRequestDTO";
import { DeleteMedicRequest } from "../dto/DeleteMedicRequestDTO";
import { ListMedicRequest } from "../dto/ListMedicRequestDTO";
import { MedicResponse } from "../dto/MedicResponseDTO";
import { UpdateMedicRequest } from "../dto/UpdateMedicRequestDTO";
import bcrypt from "bcrypt";

export class MedicService {
  constructor(
    private medicRepository: IMedicRepository
  ) {
  }

  async create(name: string, email: string, password: string, specialty: string): Promise<MedicResponse> {
    if (!name || !email || !password || !specialty) {
      throw new Error("Name, email, password and specialty are required.");
    }

    const medicExists = await this.medicRepository.findByEmail(email);
    if (medicExists) {
      throw new Error("Medic already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const registerData: CreateMedicRequest = {
      name,
      email,
      hashedPassword,
      specialty
    };

    return await this.medicRepository.createMedic(registerData);
  }

  async delete(id: string, password: string, userId:string | undefined): Promise<void> {
    const medic = await this.medicRepository.findById(id);
    if (!medic) {
      throw new Error("Medic not exists.");
    }

    if (userId != medic.id){
            throw new Error("Invalid id.");
        }

    const isPasswordValid = await bcrypt.compare(password, medic.password);
    if (!isPasswordValid) {
      throw new Error("Password invalid.");
    }

    const deleteRequest: DeleteMedicRequest = { id };
    await this.medicRepository.deleteMedic(deleteRequest);
  }

  async update(
    id: string,
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    specialty: string | undefined,
    userId:string | undefined
  ): Promise<MedicResponse> {
    const medic = await this.medicRepository.findById(id);
    if (!medic) {
      throw new Error("Medic not exists.");
    }

    if (userId != medic.id){
            throw new Error("Invalid id.");
        }

    let hashedPassword: string | undefined = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateRequest: UpdateMedicRequest = {
      id,
      name,
      email,
      password: hashedPassword,
      specialty,
    };

    return await this.medicRepository.updateMedic(updateRequest);
  }
  
  async list(id: string): Promise<MedicResponse> {
    const medic = await this.medicRepository.findById(id);
    if (!medic) {
      throw new Error("Medic not exists.");
    }

    const list: ListMedicRequest = { id: medic.id };
    return await this.medicRepository.listMedic(list);
  }
  
  async listAll(): Promise<MedicResponse[]> {
    return await this.medicRepository.listMedics();
  }

}
