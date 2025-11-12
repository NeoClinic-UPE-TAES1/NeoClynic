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

    test("Create Medic", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        const specialty = "Cardiology";
        const medic = await medicService.create(name, email, password, specialty);
        expect(medic).toHaveProperty("id");
        expect(medic.name).toBe(name);
        expect(medic.email).toBe(email);
        expect(medic.specialty).toBe(specialty);
    });

    test("Create Medic with existing email", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        const specialty = "Cardiology";
        await medicService.create(name, email, password, specialty);
        await expect(medicService.create(name, email, password, specialty)).rejects.toThrow("Medic already exists.");
    }
    );

});
