import { IObservationRepository } from "../domain/repository/IObservationRepository";
import { CreateObservationRequest } from "../dto/CreateObservationRequestDTO";
import { DeleteObservationRequest } from "../dto/DeleteObservationRequestDTO";
import { ListObservationRequest } from "../dto/ListObservationRequestDTO";
import { ObservationResponse } from "../dto/ObservationResponseDTO";
import { UpdateObservationRequest } from "../dto/UpdateObservationRequestDTO";

export class ObservationService {
  constructor(
    private observationRepository: IObservationRepository
  ) {
  }

  async create(comorbidity: string, allergies: string, medications: string, patientId: string): Promise<ObservationResponse> {
    const registerData: CreateObservationRequest = {
      comorbidity: comorbidity ?? '',
      allergies: allergies ?? '',
      medications: medications ?? '',
      patientId,
    };

    return await this.observationRepository.createObservation(registerData);
  }

  async update(id:string, comorbidity: string, allergies: string, medications: string, patientId: string): Promise<ObservationResponse> {
    const observation = await this.observationRepository.findById(id);
    if (!observation) {
      throw new Error("Observation not exists.");
    }

    const updateRequest: UpdateObservationRequest = {
    id,
    comorbidity: comorbidity ?? '',
    allergies: allergies ?? '',
    medications: medications ?? '',
    };

    return await this.observationRepository.updateObservation(updateRequest);
  }
  
  async list(id: string): Promise<ObservationResponse> {
    const observation = await this.observationRepository.findById(id);
    if (!observation) {
      throw new Error("Observation not exists.");
    }

    const list: ListObservationRequest = { id: observation.id };
    return await this.observationRepository.listObservation(list);
  }
  
  async delete(id: string): Promise<void> {
    const observation = await this.observationRepository.findById(id);
    if (!observation) {
      throw new Error("Observation not exists.");
    }

    const deleteRequest: DeleteObservationRequest = { id };
    await this.observationRepository.deleteObservation(deleteRequest);
  }

}
