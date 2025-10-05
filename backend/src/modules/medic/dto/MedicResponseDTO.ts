import { Consultation } from "../../consultation/domain/entity/Consultation";
export type MedicResponse = {
    id: string
    name: string,
    email: string
    specialty: string
    consultation: Consultation[]
}