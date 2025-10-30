import { Patient } from "../../../infra/database/client";
export type UpdateObservationRequest = {
    id: string
    comorbidity?: string
    allergies?: string
    medications?: string
}




