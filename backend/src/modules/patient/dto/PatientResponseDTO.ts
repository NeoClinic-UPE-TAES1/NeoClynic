export interface PatientResponse {
    id: string;
    name: string;
    birthDay: Date;
    sex: string;
    cpf: string;
    ethnicity: string;
    email: string | null;
    observation: {
        comorbidity: string;
        allergies: string;
        medications: string;
    } | null;
}