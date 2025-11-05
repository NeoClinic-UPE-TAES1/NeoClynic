export interface Patient {
    id: string;
    name: string;
    birthDay: Date;
    sex: string;
    cpf: string;
    ethnicity: string;
    email: string | null;
    observation?: {
        comorbidity: string;
        allergies: string;
        medications: string;
    };
}

export interface CreatePatientDTO {
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

export interface UpdatePatientDTO {
    name?: string;
    birthDay?: Date;
    sex?: string;
    cpf?: string;
    ethnicity?: string;
    email?: string;
}

export interface UpdateObservationDTO {
    comorbidity?: string;
    allergies?: string;
    medications?: string;
}