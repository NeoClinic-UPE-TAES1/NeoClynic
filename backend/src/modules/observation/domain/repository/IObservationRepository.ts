import type { Observation } from "../entity/Observation";
import { ObservationResponse } from "../../dto/ObservationResponseDTO";
import { CreateObservationRequest } from "../../dto/CreateObservationRequestDTO";
import { DeleteObservationRequest } from "../../dto/DeleteObservationRequestDTO";
import { UpdateObservationRequest } from "../../dto/UpdateObservationRequestDTO";
import { ListObservationRequest } from "../../dto/ListObservationRequestDTO";
 
export interface IObservationRepository {
    createObservation(createObservation: CreateObservationRequest): Promise<ObservationResponse>;
    listObservation(ListObservation:ListObservationRequest): Promise<ObservationResponse>;
    updateObservation(updateObservation: UpdateObservationRequest): Promise<ObservationResponse>;
    deleteObservation(deleteObservation:DeleteObservationRequest): Promise<void>;
    
    findById(id: string): Promise<Observation | null>;
    findByPatientId(patientId: string): Promise<Observation | null>;
}