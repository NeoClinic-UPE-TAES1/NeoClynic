export type CreatePatientRequest = {
    name: string,
    birthDay: Date,
    sex: string,
    cpf: string,
    ethnicity: string,
    email?: string
}