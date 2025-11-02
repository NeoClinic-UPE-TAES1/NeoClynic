export type CreateReportRequest = {
    description: string,
    diagnosis: string,
    prescription?: string,
    consultationId: string
}