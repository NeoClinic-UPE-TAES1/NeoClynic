import { Consultation } from "../entities/Consultation";
export type MedicResponse = {
    id: string
    name: string,
    email: string
    specialty: string
    consultation: Consultation[]
}