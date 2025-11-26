// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { MedicService } from "../../../src/modules/medic/service/MedicService";
import { MedicRepository } from "../../../src/modules/medic/domain/repository/MedicRepository";
import { AdminRepository } from "../../../src/modules/admin/domain/repository/AdminRepository";
import { prisma } from "../../../src/infra/database/prismaClient";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let medicRepository: MedicRepository
    let adminRepository: AdminRepository
    let medicService: MedicService;

    beforeAll(() => {
        prismaClient = prisma;
        adminRepository = new AdminRepository();
        medicRepository = new MedicRepository();
        medicService = new MedicService(medicRepository, adminRepository);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });
    beforeEach(async () => {
        await prismaClient.report.deleteMany();
        await prismaClient.consultation.deleteMany();
        await prismaClient.medic.deleteMany();
    });

    test("Delete Medic", async () => {
        const adminPassword = process.env.INIT_ADMIN_PASSWORD!;
        const adminEmail = process.env.INIT_ADMIN_EMAIL!;

        const admin = await prisma.admin.findUnique({ where: { email: adminEmail } });
        if (!admin) throw new Error("Initial admin not found in DB for test setup");

        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        const specialty = "Cardiology";
        const medic = await medicService.create(name, email, password, specialty);
        await expect(medicService.delete(medic.id, adminPassword, admin.id)).resolves.toBeUndefined();
    });
    test("Delete Medic with wrong password", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com";
        const password = "password123";
        const specialty = "Cardiology";
        const medic = await medicService.create(name, email, password, specialty);
        await expect(medicService.delete(medic.id, "wrongpassword", medic.id)).rejects.toThrow(
            "User is not an admin."
        );
    });

});
