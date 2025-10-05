import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { ISecretaryRepository } from "../domain/repository/ISecretaryRepository";
import bcrypt from 'bcrypt';
import { LoginSecretaryResponse } from "../dto/LoginSecretaryResponse";

export class AuthSecretaryService{
    constructor(
        private authProvider: IAuthProvider,
        private secretaryRepository: ISecretaryRepository
    ){}

    async authenticate(email: string, password: string): Promise<LoginSecretaryResponse | null> {
        const secretary = await this.secretaryRepository.findByEmail(email);
        if (!secretary) {
            throw new Error("Secretary not found.");
        }

        const isPasswordValid = await bcrypt.compare(password, secretary.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password.");
        }

        const token = this.authProvider.sign({ id: secretary.id });

        const result: LoginSecretaryResponse = {
            token,
            secretary: {
                id: secretary.id,
                name: secretary.name,
                email: secretary.email
            }
        };

        return result;
    }
}