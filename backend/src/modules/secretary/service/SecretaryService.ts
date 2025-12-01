import { ISecretaryRepository } from "../domain/repository/ISecretaryRepository";
import { IAdminRepository } from "../../admin/domain/repository/IAdminRepository";
import { CreateSecretaryRequest } from "../dto/CreateSecretaryRequestDTO";
import { DeleteSecretaryRequest } from "../dto/DeleteSecretaryRequestDTO";
import { ListSecretaryRequest } from "../dto/ListSecretaryRequestDTO";
import { SecretaryResponse } from "../dto/SecretaryResponseDTO";
import { UpdateSecretaryRequest } from "../dto/UpdateSecretaryRequestDTO";
import { AppError } from "../../../core/errors/AppError";
import bcrypt from "bcrypt";

export class SecretaryService {
    constructor(private secretaryRepository: ISecretaryRepository,
                private adminRepository: IAdminRepository
    ) {}

    async create(name: string, email: string, password: string): Promise<SecretaryResponse> {
        
        if (!name || !email || !password){
            throw new AppError("Missing required field", 400);
        }
        
        const secretary =  await this.secretaryRepository.findByEmail(email)

        if (secretary != null){
            throw new AppError("Secretary already exists.", 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const registerData: CreateSecretaryRequest = {
            name,
            email,
            hashedPassword
        };

        return await this.secretaryRepository.createSecretary(registerData)

    }

    async delete(id:string, adminPassword:string, userId:string | undefined): Promise<void>{
        const secretary =  await this.secretaryRepository.findById(id);
        if (secretary == null){
            throw new AppError("Secretary not exists.", 404);
        }

        if (userId == undefined){
            throw new AppError("User id is required.", 400);
        }

        const isAdmin = await this.adminRepository.findById(userId);
        if (!isAdmin) {
            throw new AppError("User is not an admin.", 403);
        }

        const passwordMatch = await bcrypt.compare(adminPassword, isAdmin.password);
        if (!passwordMatch){
            throw new AppError("Password invalid.", 401);
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
        userId: string | undefined,
        userRole: string | undefined
    ): Promise<SecretaryResponse> {
        const secretary = await this.secretaryRepository.findById(id);
        if (!secretary) {
            throw new AppError("Secretary not exists.", 404);
        }

        // ADMIN pode editar qualquer secretária, SECRETARY só pode editar a si mesma
        if (userRole !== 'ADMIN' && userId !== secretary.id) {
            throw new AppError("Invalid id.", 400);
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
            throw new AppError("Secretary not exists.", 404);
        }

        const list: ListSecretaryRequest = { id: secretary.id };

        return await this.secretaryRepository.listSecretary(list);
        }

    async listAll(page:number | undefined, limit:number | undefined): Promise<SecretaryResponse[]> {
        return await this.secretaryRepository.listSecretaries(page, limit);
    }



}

