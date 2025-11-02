// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { MedicService } from "../../../src/modules/medic/service/MedicService";
import { prisma } from "../../../src/infra/database/prismaClient";
import { MedicRepository } from "../../../src/modules/medic/domain/repository/MedicRepository";
import { AuthMedicService } from "../../../src/modules/medic/service/AuthMedicService";
import { JWTProvider } from "../../../src/infra/providers/auth/JWTProvider";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let medicRepository: MedicRepository;
    let medicService: MedicService;
    let authMedicService: AuthMedicService;
    let jwtProvider: JWTProvider;

    beforeAll(() => {
        prismaClient = prisma;
        jwtProvider = new JWTProvider();
        medicRepository = new MedicRepository();
        medicService = new MedicService(medicRepository);
        authMedicService = new AuthMedicService(medicRepository, jwtProvider);
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
        await medicService.create(name, email, password, specialty);
        const login = await authMedicService.authenticate(email, password);
        expect(login).toHaveProperty("token");
        expect(login?.medic).toHaveProperty("id");
        expect(login?.medic.name).toBe(name);
        expect(login?.medic.email).toBe(email);
        expect(login?.medic.specialty).toBe(specialty);
    });

});
