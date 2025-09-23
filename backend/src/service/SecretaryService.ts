import { ISecretaryRepository } from "../domain/repository/ISecretaryRepository";
import { CreateSecretaryRequest } from "../dto/CreateSecretaryRequestDTO";
import { DeleteSecretaryRequest } from "../dto/DeleteSecretaryRequestDTO";
import { ListSecretaryRequest } from "../dto/ListSecretaryRequestDTO";
import { SecretaryResponse } from "../dto/SecretaryResponseDTO";
import { UpdateSecretaryRequest } from "../dto/UpdateSecretaryRequestDTO";
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


    static async update(
        id: string,
        name: string | undefined,
        email: string | undefined,
        password: string | undefined,
        secretaryRepository: ISecretaryRepository
    ): Promise<SecretaryResponse> {
        const secretary = await secretaryRepository.findById(id);
        if (!secretary) {
            throw new Error("Secretary not exists.");
        }

        let hashedPassword: string | undefined = undefined;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updateRequest: UpdateSecretaryRequest = {
            id,
            name,
            email,
            password: hashedPassword
        };

        return await secretaryRepository.updateSecretary(updateRequest);
    }




    static async listAll(secretaryRepository: ISecretaryRepository): Promise<SecretaryResponse[]> {
        return await secretaryRepository.listSecretaries();
    }

    static async listOne(id: string, secretaryRepository: ISecretaryRepository): Promise<SecretaryResponse> {
        const secretary = await secretaryRepository.findById(id);
        if (secretary == null) {
            throw new Error("Secretary not exists.");
        }

        const list: ListSecretaryRequest = { id: secretary.id };

        return await secretaryRepository.listSecretary(list);
        }


}

