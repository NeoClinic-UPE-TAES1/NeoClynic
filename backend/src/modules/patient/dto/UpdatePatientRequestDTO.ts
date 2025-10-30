import { Consultation } from "../../consultation/domain/entity/Consultation";
import { Observation } from "../../observation/domain/entity/Observation";
export type UpdatePatientRequest = {
    id: string
    name?: string
    birthDay?: Date
    sex?: string
    cpf?: string
    ethnicity?: string
    email?: string
}
