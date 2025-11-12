export type LoginAdminResponse = {
    token: string;
    admin: {
        id: string;
        name: string;
        email: string;
    };
};