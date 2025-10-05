import { IAuthProvider } from "../../../infra/providers/auth/IAuthProvider";
import { IMedicRepository } from "../domain/repository/IMedicRepository";
import bcrypt from 'bcrypt';
import { LoginMedicResponse } from "../dto/LoginMedicResponse";

export class AuthMedicService{
    constructor(
        private authProvider: IAuthProvider,
        private medicRepository: IMedicRepository
    ){}

    async authenticate(email: string, password: string): Promise<LoginMedicResponse | null> {
        const medic = await this.medicRepository.findByEmail(email);
        if (!medic) {
            throw new Error("Medic not found.");
        }

        const isPasswordValid = await bcrypt.compare(password, medic.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password.");
        }

        const token = this.authProvider.sign({ id: medic.id });

        const result: LoginMedicResponse = {
            token,
            medic: {
                id: medic.id,
                name: medic.name,
                email: medic.email,
                specialty: medic.specialty
            }
        };

        return result;
    }
}