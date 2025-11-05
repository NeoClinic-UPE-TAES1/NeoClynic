export interface UpdatePatientRequest {
    id: string;
    name: string;
    birthDay: Date;
    sex: string;
    cpf: string;
    ethnicity: string;
    email?: string;
}