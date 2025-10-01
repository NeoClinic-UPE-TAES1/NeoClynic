// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { SecretaryService } from "../../../src/modules/secretary/service/SecretaryService";
import { prisma } from "../../../src/infra/database/prismaClient";
import { SecretaryRepository } from "../../../src/modules/secretary/domain/repository/SecretaryRepository";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let secretaryRepository: SecretaryRepository;
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

    test("Create Secretary", async () => {
        const name = "John Doe";
        const email = ""
        const password = "password123";
        const secretary = await secretaryService.create(name, email, password);
        expect(secretary).toHaveProperty("id");
        expect(secretary.name).toBe(name);
        expect(secretary.email).toBe(email);
    });

    test("Create Secretary with existing email", async () => {
        const name = "John Doe";
        const email = ""
        const password = "password123";
        await secretaryService.create(name, email, password);
        await expect(secretaryService.create(name, email, password)).rejects.toThrow("Secretary already exists.");
    }
    );

    test("Create Secretary with missing fields", async () => {
        const name = "John Doe";
        const email = "";
        const password = "password123";
        await expect(secretaryService.create(name, email, password)).rejects.toThrow("Name, email, and password are required.");
    }   
    );

});
