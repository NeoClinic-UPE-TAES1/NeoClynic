import { Consultation } from "../../consultation/domain/entity/Consultation";
export type CreateMedicRequest = {
    name: string,
    email: string
    specialty: string
    hashedPassword:string
    consultation?: Consultation[]
}