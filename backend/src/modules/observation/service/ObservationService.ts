import { IObservationRepository } from "../domain/repository/IObservationRepository";
import { CreateObservationRequest } from "../dto/CreateObservationRequestDTO";
import { DeleteObservationRequest } from "../dto/DeleteObservationRequestDTO";
import { ListObservationRequest } from "../dto/ListObservationRequestDTO";
import { ObservationResponse } from "../dto/ObservationResponseDTO";
import { UpdateObservationRequest } from "../dto/UpdateObservationRequestDTO";
import { AppError } from "../../../core/errors/AppError";

export class ObservationService {
  constructor(
    private observationRepository: IObservationRepository
  ) {
  }

  async create(comorbidity: string, allergies: string, medications: string, patientId: string): Promise<ObservationResponse> {
    const registerData: CreateObservationRequest = {
      comorbidity,
      allergies,
      medications,
      patientId,
    };

    return await this.observationRepository.createObservation(registerData);
  }

  async update(id:string, comorbidity: string | undefined, allergies: string | undefined, medications: string | undefined): Promise<ObservationResponse> {
    const observation = await this.observationRepository.findById(id);
    if (!observation) {
      throw new AppError("Observation not exists.", 404);
    }

    const updateRequest: UpdateObservationRequest = {
    id,
    comorbidity,
    allergies,
    medications,
    };

    return await this.observationRepository.updateObservation(updateRequest);
  }
  
  async list(id: string): Promise<ObservationResponse> {
    const observation = await this.observationRepository.findById(id);
    if (!observation) {
      throw new AppError("Observation not exists.", 404);
    }

    const list: ListObservationRequest = { id: observation.id };
    return await this.observationRepository.listObservation(list);
  }
  
  async delete(id: string): Promise<void> {
    const observation = await this.observationRepository.findById(id);
    if (!observation) {
      throw new AppError("Observation not exists.", 404);
    }

    const deleteRequest: DeleteObservationRequest = { id };
    await this.observationRepository.deleteObservation(deleteRequest);
  }

}
