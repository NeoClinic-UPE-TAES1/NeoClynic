// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { SecretaryService } from "../../../src/modules/secretary/service/SecretaryService";
import { AdminRepository } from "../../../src/modules/admin/domain/repository/AdminRepository";
import { SecretaryRepository } from "../../../src/modules/secretary/domain/repository/SecretaryRepository";
import { prisma } from "../../../src/infra/database/prismaClient";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let secretaryRepository: SecretaryRepository
    let adminRepository: AdminRepository
    let secretaryService: SecretaryService;

    beforeAll(() => {
        prismaClient = prisma;
        secretaryRepository = new SecretaryRepository();
        adminRepository = new AdminRepository();
        secretaryService = new SecretaryService(secretaryRepository, adminRepository);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });
    beforeEach(async () => {
        await prismaClient.secretary.deleteMany();
    });

    test("Create Secretary", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        const secretary = await secretaryService.create(name, email, password);
        expect(secretary).toHaveProperty("id");
        expect(secretary.name).toBe(name);
        expect(secretary.email).toBe(email);
    });

    test("Create Secretary with existing email", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        await secretaryService.create(name, email, password);
        await expect(secretaryService.create(name, email, password)).rejects.toThrow("Secretary already exists.");
    }
    );

});
