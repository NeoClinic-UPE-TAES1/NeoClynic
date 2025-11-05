export interface CreatePatientRequest {
    name: string;
    birthDay: Date;
    sex: string;
    cpf: string;
    ethnicity: string;
    email?: string;
    observation?: {
        comorbidity: string;
        allergies: string;
        medications: string;
    };
}