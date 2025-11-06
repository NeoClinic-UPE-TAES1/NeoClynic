import { ISecretaryRepository } from "../domain/repository/ISecretaryRepository";
import { CreateSecretaryRequest } from "../dto/CreateSecretaryRequestDTO";
import { DeleteSecretaryRequest } from "../dto/DeleteSecretaryRequestDTO";
import { ListSecretaryRequest } from "../dto/ListSecretaryRequestDTO";
import { SecretaryResponse } from "../dto/SecretaryResponseDTO";
import { UpdateSecretaryRequest } from "../dto/UpdateSecretaryRequestDTO";
import bcrypt from "bcrypt";

export class SecretaryService {
    constructor(private secretaryRepository: ISecretaryRepository) {}

    async create(name: string, email: string, password: string): Promise<SecretaryResponse> {
        
        if (!name || !email || !password){
            throw new Error("Name, email, and password are required.");
        }
        
        const secretary =  await this.secretaryRepository.findByEmail(email)

        if (secretary != null){
            throw new Error("Secretary already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const registerData: CreateSecretaryRequest = {
            name,
            email,
            hashedPassword
        };

        return await this.secretaryRepository.createSecretary(registerData)

    }

    async delete(id:string, password:string, userId:string | undefined): Promise<void>{
        const secretary =  await this.secretaryRepository.findById(id)
        
        if (secretary == null){
            throw new Error("Secretary not exists.");
        }

        if (userId != secretary.id){
            throw new Error("Invalid id.");
        }

        const isPasswordValid = await bcrypt.compare(password, secretary.password);
        if (!isPasswordValid){
            throw new Error("Password invalid.");
        }

        const deleteRequest:DeleteSecretaryRequest = {
            id
        }

        await this.secretaryRepository.deleteSecretary(deleteRequest)
    }


    async update(
        id: string,
        name: string | undefined,
        email: string | undefined,
        password: string | undefined,
        userId:string | undefined
    ): Promise<SecretaryResponse> {
        const secretary = await this.secretaryRepository.findById(id);
        if (!secretary) {
            throw new Error("Secretary not exists.");
        }

        if (userId != secretary.id){
            throw new Error("Invalid id.");
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

        return await this.secretaryRepository.updateSecretary(updateRequest);
    }

    async list(id: string): Promise<SecretaryResponse> {
        const secretary = await this.secretaryRepository.findById(id);
        if (secretary == null) {
            throw new Error("Secretary not exists.");
        }

        const list: ListSecretaryRequest = { id: secretary.id };

        return await this.secretaryRepository.listSecretary(list);
        }

    async listAll(): Promise<SecretaryResponse[]> {
        return await this.secretaryRepository.listSecretaries();
    }



}

