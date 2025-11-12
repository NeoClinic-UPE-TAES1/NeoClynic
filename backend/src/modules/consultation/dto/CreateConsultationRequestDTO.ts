export type CreateConsultationRequest = {
    date: Date,
    hasFollowUp: boolean,
    medicId: string,
    patientId: string,
    report?: Report;
}