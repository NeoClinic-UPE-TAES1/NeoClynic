export type LoginSecretaryResponse = {
    token: string;
    secretary: {
        id: string;
        name: string;
        email: string;
    };
};