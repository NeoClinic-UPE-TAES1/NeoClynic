import { IMedicRepository } from "../domain/repository/IMedicRepository";
import { CreateMedicRequest } from "../dto/CreateMedicRequestDTO";
import { DeleteMedicRequest } from "../dto/DeleteMedicRequestDTO";
import { ListMedicRequest } from "../dto/ListMedicRequestDTO";
import { MedicResponse } from "../dto/MedicResponseDTO";
import { UpdateMedicRequest } from "../dto/UpdateMedicRequestDTO";
import bcrypt from "bcrypt";

export class MedicService {
  static async create(name: string, email: string, password: string, specialty: string, medicRepository: IMedicRepository): Promise<MedicResponse> {
    if (!name || !email || !password || !specialty) {
      throw new Error("Name, email, password and specialty are required.");
    }

    const medicExists = await medicRepository.findByEmail(email);
    if (medicExists) {
      throw new Error("Medic already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const registerData: CreateMedicRequest = {
      name,
      email,
      specialty,
      consultation: [],
      hashedPassword,
    };

    return await medicRepository.createMedic(registerData);
  }

  static async delete(id: string, password: string, medicRepository: IMedicRepository): Promise<void> {
    const medic = await medicRepository.findById(id);
    if (!medic) {
      throw new Error("Medic not exists.");
    }

    const isPasswordValid = await bcrypt.compare(password, medic.password);
    if (!isPasswordValid) {
      throw new Error("Password invalid.");
    }

    const deleteRequest: DeleteMedicRequest = { id };
    await medicRepository.deleteMedic(deleteRequest);
  }

  static async update(
    id: string,
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    specialty: string | undefined,
    medicRepository: IMedicRepository
  ): Promise<MedicResponse> {
    const medic = await medicRepository.findById(id);
    if (!medic) {
      throw new Error("Medic not exists.");
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

    return await medicRepository.updateMedic(updateRequest);
  }

  static async listAll(medicRepository: IMedicRepository): Promise<MedicResponse[]> {
    return await medicRepository.listMedics();
  }

  static async listOne(id: string, medicRepository: IMedicRepository): Promise<MedicResponse> {
    const medic = await medicRepository.findById(id);
    if (!medic) {
      throw new Error("Medic not exists.");
    }

    const list: ListMedicRequest = { id: medic.id };
    return await medicRepository.listMedic(list);
  }
}
