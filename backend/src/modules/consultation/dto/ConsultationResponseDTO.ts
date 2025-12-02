import { Report } from "../../report/domain/entity/Report";

export type ConsultationResponse = {
    id: string,
    date: Date,
    hasFollowUp: boolean,
    medicId: string,
    patientId: string,
    report?: Report;
}