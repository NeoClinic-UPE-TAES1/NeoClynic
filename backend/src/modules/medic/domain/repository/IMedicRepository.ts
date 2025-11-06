import { MedicResponse } from "../../dto/MedicResponseDTO";
import { CreateMedicRequest } from "../../dto/CreateMedicRequestDTO";
import type { Medic } from "../entity/Medic";
import { DeleteMedicRequest } from "../../dto/DeleteMedicRequestDTO";
import { UpdateMedicRequest } from "../../dto/UpdateMedicRequestDTO";
import { ListMedicRequest } from "../../dto/ListMedicRequestDTO";
 
export interface IMedicRepository {
    createMedic(createMedic: CreateMedicRequest): Promise<MedicResponse>;
    listMedic(ListMedic:ListMedicRequest): Promise<MedicResponse>;
    listMedics(): Promise<MedicResponse[]>;
    updateMedic(updateMedic: UpdateMedicRequest): Promise<MedicResponse>;
    deleteMedic(deleteMedic:DeleteMedicRequest): Promise<void>;

    saveResetToken(adminId: string, token: string, expiresAt: Date): Promise<void>;
    invalidateResetToken(token: string): Promise<void>;

    findByResetToken(token: string): Promise<{ medicId: string; expiresAt: Date } | null>;
    findByEmail(email: string): Promise<Medic | null>;
    findById(id: string): Promise<Medic | null>;
}