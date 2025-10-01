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

    test("Delete Secretary", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        const secretary = await secretaryService.create(name, email, password);
        await expect(secretaryService.delete(secretary.id, password)).resolves.toBeUndefined();
    });
    test("Delete Secretary with wrong password", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        const secretary = await secretaryService.create(name, email, password);
        await expect(secretaryService.delete(secretary.id, "wrongpassword")).rejects.toThrow("Password invalid.");
    }
    );
    
});
