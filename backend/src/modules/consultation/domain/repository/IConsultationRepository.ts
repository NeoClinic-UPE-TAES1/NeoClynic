import { ConsultationResponse } from "../../dto/ConsultationResponseDTO";
import { CreateConsultationRequest } from "../../dto/CreateConsultationRequestDTO";
import { DeleteConsultationRequest } from "../../dto/DeleteConsultationRequestDTO";
import { UpdateConsultationRequest } from "../../dto/UpdateConsultationRequestDTO";
import { ListConsultationRequest } from "../../dto/ListConsultationRequestDTO";
import { Consultation } from "../entity/Consultation";

export interface IConsultationRepository {
    createConsultation(createConsultationRequest:CreateConsultationRequest):Promise<ConsultationResponse>;
    deleteConsultation(deleteConsultationRequest:DeleteConsultationRequest):Promise<void>;
    updateConsultation(updateConsultationRequest:UpdateConsultationRequest):Promise<ConsultationResponse>;
    listConsultation(listConsultationRequest:ListConsultationRequest):Promise<ConsultationResponse>;
    listConsultations(page: number | undefined, limit:number | undefined):Promise<ConsultationResponse[]>;

    findByMedic(medicId: string, page: number | undefined, limit:number | undefined): Promise<ConsultationResponse[]>;
    findById(id: string): Promise<Consultation | null>;
}