import { Consultation } from "../../consultation/domain/entity/Consultation";
import { Observation } from "../../observation/domain/entity/Observation";
export type CreatePatientRequest = {
    name: string,
    birthDay: Date,
    sex: string,
    cpf: string,
    ethnicity: string,
    email?: string
}