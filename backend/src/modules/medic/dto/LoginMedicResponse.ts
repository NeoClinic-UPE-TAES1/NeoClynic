export type LoginMedicResponse = {
    token: string;
    medic: {
        id: string;
        name: string;
        email: string;
        specialty: string;
    };
};