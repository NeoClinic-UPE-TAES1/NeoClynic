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

    test("List All Secretaries", async () => {
        const name1 = "John Doe";
        const email1 = "JohnDoe@gmail.com"
        const password1 = "password123";
        const name2 = "Jane Smith";
        const email2 = "JaneSmith@gmail.com"
        const password2 = "password456";
        await secretaryService.create(name1, email1, password1);
        await secretaryService.create(name2, email2, password2);
        const secretaries = await secretaryService.listAll();
        expect(secretaries.length).toBe(2);
        const emails = secretaries.map(s => s.email);
        expect(emails).toContain(email1);
        expect(emails).toContain(email2);
    });
    test("List One Secretary", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        const secretary = await secretaryService.create(name, email, password);
        const foundSecretary = await secretaryService.list(secretary.id);
        expect(foundSecretary.email).toBe(email);

        await expect(secretaryService.list("non-existing-id")).rejects.toThrow("Secretary not exists.");
    }
    );
});
