import { IMedicRepository } from "../domain/repository/IMedicRepository";
import { IAdminRepository } from "../../admin/domain/repository/IAdminRepository";
import { CreateMedicRequest } from "../dto/CreateMedicRequestDTO";
import { DeleteMedicRequest } from "../dto/DeleteMedicRequestDTO";
import { ListMedicRequest } from "../dto/ListMedicRequestDTO";
import { MedicResponse } from "../dto/MedicResponseDTO";
import { UpdateMedicRequest } from "../dto/UpdateMedicRequestDTO";
import { AppError } from "../../../core/errors/AppError";
import bcrypt from "bcrypt";

export class MedicService {
  constructor(
    private medicRepository: IMedicRepository,
    private adminRepository: IAdminRepository
  ) {
  }

  async create(name: string, email: string, password: string, specialty: string): Promise<MedicResponse> {
    if (!name || !email || !password || !specialty) {
      throw new AppError("Missing required fields.", 400);
    }

    const medicExists = await this.medicRepository.findByEmail(email);
    if (medicExists) {
      throw new AppError("Medic already exists.", 409);
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

  async delete(id: string, adminPassword: string, userId:string | undefined): Promise<void> {
    const medic = await this.medicRepository.findById(id);
    if (!medic) {
      throw new AppError("Medic not exists.", 404);
    }

    if (userId == undefined){
                throw new AppError("User id is required.", 400);
            }
    
    const isAdmin = await this.adminRepository.findById(userId);
    if (!isAdmin) {
        throw new AppError("User is not an admin.", 403);
    }

    const passwordMatch = await bcrypt.compare(adminPassword, isAdmin.password);
    if (!passwordMatch){
        throw new AppError("Password invalid.", 401);
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
    userId: string | undefined,
    userRole: string | undefined,
    currentPassword: string | undefined
  ): Promise<MedicResponse> {
    const medic = await this.medicRepository.findById(id);
    if (!medic) {
      throw new AppError("Medic not exists.", 404);
    }

    // ADMIN pode editar qualquer médico, MEDIC só pode editar a si mesmo
    if (userRole !== 'ADMIN' && userId !== medic.id) {
      throw new AppError("Invalid user id.", 400);
    }

    let hashedPassword: string | undefined = undefined;
    if (password) {
      // Se o usuário está alterando sua própria senha, exigir senha atual
      // Se é ADMIN alterando senha de outro usuário, não exigir
      const isChangingOwnPassword = userId === medic.id;
      
      if (isChangingOwnPassword) {
        if (!currentPassword) {
          throw new AppError("Current password is required to change password.", 400);
        }
        const passwordMatch = await bcrypt.compare(currentPassword, medic.password);
        if (!passwordMatch) {
          throw new AppError("Current password is incorrect.", 401);
        }
      }
      
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
      throw new AppError("Medic not exists.", 404);
    }

    const list: ListMedicRequest = { id: medic.id };
    return await this.medicRepository.listMedic(list);
  }
  
  async listAll(page:number|undefined, limit:number|undefined): Promise<MedicResponse[]> {
    return await this.medicRepository.listMedics(page, limit);
  }

}
