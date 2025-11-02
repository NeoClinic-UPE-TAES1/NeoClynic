// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { SecretaryService } from "../../../src/modules/secretary/service/SecretaryService";
import { SecretaryRepository } from "../../../src/modules/secretary/domain/repository/SecretaryRepository";
import { prisma } from "../../../src/infra/database/prismaClient";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let secretaryRepository: SecretaryRepository
    let secretaryService: SecretaryService;

    beforeAll(() => {
        prismaClient = prisma;
        secretaryRepository = new SecretaryRepository();
        secretaryService = new SecretaryService(secretaryRepository);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });
    beforeEach(async () => {
        await prismaClient.secretary.deleteMany();
    });

    test("Update Secretary", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        const secretary = await secretaryService.create(name, email, password);
        const newName = "Jane Doe";
        const updatedSecretary = await secretaryService.update(secretary.id, newName, undefined, undefined, secretary.id);
        expect(updatedSecretary.name).toBe(newName);
        expect(updatedSecretary.email).toBe(email);
    }
    );
    
});
