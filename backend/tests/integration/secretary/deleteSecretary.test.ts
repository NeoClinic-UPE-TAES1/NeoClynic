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

    test("Delete Secretary", async () => {
        const adminPassword = process.env.INIT_ADMIN_PASSWORD!;
        const adminEmail = process.env.INIT_ADMIN_EMAIL!;

        const admin = await prisma.admin.findUnique({ where: { email: adminEmail } });
        if (!admin) throw new Error("Initial admin not found in DB for test setup");

        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        const secretary = await secretaryService.create(name, email, password);
        await expect(secretaryService.delete(secretary.id, adminPassword, admin.id)).resolves.toBeUndefined();
    });
    
    test("Delete Secretary with wrong password", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        const secretary = await secretaryService.create(name, email, password);
        await expect(secretaryService.delete(secretary.id, "wrongpassword", secretary.id)).rejects.toThrow("User is not an admin.")
    }
    );
    
});
