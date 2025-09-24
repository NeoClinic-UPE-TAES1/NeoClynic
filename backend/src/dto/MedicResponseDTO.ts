import { Consultation } from "../domain/entity/Consultation";
export type MedicResponse = {
    id: string
    name: string,
    email: string
    specialty: string
    consultation: Consultation[]
}