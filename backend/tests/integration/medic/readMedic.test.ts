// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { MedicService } from "../../../src/modules/medic/service/MedicService";
import { MedicRepository } from "../../../src/modules/medic/domain/repository/MedicRepository";
import { prisma } from "../../../src/infra/database/prismaClient";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let medicRepository: MedicRepository
    let medicService: MedicService;

    beforeAll(() => {
        prismaClient = prisma;
        medicRepository = new MedicRepository();
        medicService = new MedicService(medicRepository);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });
    beforeEach(async () => {
        await prismaClient.medic.deleteMany();
    });

    test("List All Medics", async () => {
        const name1 = "John Doe";
        const email1 = "JohnDoe@gmail.com"
        const password1 = "password123";
        const specialty1 = "Cardiology";
        const name2 = "Jane Smith";
        const email2 = "JaneSmith@gmail.com"
        const password2 = "password456";
        const specialty2 = "Neurology";
        await medicService.create(name1, email1, password1, specialty1);
        await medicService.create(name2, email2, password2, specialty2);
        const medics = await medicService.listAll();
        expect(medics.length).toBe(2);
        const emails = medics.map(s => s.email);
        expect(emails).toContain(email1);
        expect(emails).toContain(email2);
    });
    test("List One Medic", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        const specialty = "Cardiology";
        const medic = await medicService.create(name, email, password, specialty);
        const foundMedic = await medicService.listOne(medic.id);
        expect(foundMedic.email).toBe(email);

        await expect(medicService.listOne("non-existing-id")).rejects.toThrow("Medic not exists.");
    }
    );
});
