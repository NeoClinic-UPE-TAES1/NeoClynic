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

    test("Update Medic", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        const specialty = "Cardiology";
        const medic = await medicService.create(name, email, password, specialty);
        const newName = "Jane Doe";
        const updatedMedic = await medicService.update(medic.id, newName, undefined, undefined, undefined);
        expect(updatedMedic.name).toBe(newName);
        expect(updatedMedic.email).toBe(email);
    }
    );
    
});
