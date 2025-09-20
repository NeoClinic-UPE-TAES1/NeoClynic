import { ISecretaryRepository } from "../domain/repository/ISecretaryRepository";
import { CreateSecretaryRequest } from "../dto/CreateSecretaryRequestDTO";
import { DeleteSecretaryRequest } from "../dto/DeleteSecretaryRequestDTO";
import { SecretaryResponse } from "../dto/SecretaryResponseDTO";
import bcrypt from "bcrypt";

export class SecretaryService {

    static async create(name: string, email: string, password: string, SecretaryRepository:ISecretaryRepository): Promise<SecretaryResponse> {
        const secretary =  await SecretaryRepository.findByEmail(email)
        console.log(secretary)

        if (!name || !email || !password){
            throw new Error("Name, email, and password are required.");
        }

        if (secretary != null){
            throw new Error("Secretary already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const registerData: CreateSecretaryRequest = {
            name,
            email,
            hashedPassword
        };

        return await SecretaryRepository.createSecretary(registerData)

    }

    static async delete(id:string, password:string, SecretaryRepository:ISecretaryRepository): Promise<void>{
        const secretary =  await SecretaryRepository.findById(id)
        
        if (secretary == null){
            throw new Error("Secretary not exists.");
        }

        if (id != secretary.id){
            throw new Error("Data invalid.");
        }

        const isPasswordValid = await bcrypt.compare(password, secretary.password);
        if (!isPasswordValid){
            throw new Error("Password invalid.");
        }

        const deleteRequest:DeleteSecretaryRequest = {
            id
        }

        await SecretaryRepository.deleteSecretary(deleteRequest)
    }
}