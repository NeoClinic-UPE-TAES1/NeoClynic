// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../src/infra/database/prismaClient";
import { PatientService } from "../../../src/modules/patient/service/PatientService";
import { PatientRepository } from "../../../src/modules/patient/domain/repository/PatientRepository";
import { ObservationRepository } from "../../../src/modules/observation/domain/repository/ObservationRepository";
import { SecretaryRepository } from "../../../src/modules/secretary/domain/repository/SecretaryRepository";
import { SecretaryService } from "../../../src/modules/secretary/service/SecretaryService";
import { AdminRepository } from "../../../src/modules/admin/domain/repository/AdminRepository";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let patientRepository: PatientRepository;
    let patientService: PatientService;
    let observationRepository: ObservationRepository;
    let adminRepository: AdminRepository;
    let secretaryRepository: SecretaryRepository;
    let secretaryService: SecretaryService;

    beforeAll(() => {
        prismaClient = prisma;
        patientRepository = new PatientRepository();
        observationRepository = new ObservationRepository();
        secretaryRepository = new SecretaryRepository();
        adminRepository = new AdminRepository();
        secretaryService = new SecretaryService(secretaryRepository, adminRepository);
        patientService = new PatientService(patientRepository, observationRepository, secretaryRepository);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });
    beforeEach(async () => {
        await prismaClient.secretary.deleteMany();
        await prismaClient.report.deleteMany();
        await prismaClient.consultation.deleteMany();
        await prismaClient.observation.deleteMany();
        await prismaClient.patient.deleteMany();
    });

    test("Delete Patient", async () => {
        const secretary = await secretaryService.create("Sec", "sec@admin.com", "123456");

        const name = "John Doe";
        const birthDay = new Date("2032-10-21T17:45:30.123Z");
        const sex = "M";
        const cpf = "12345678900";
        const ethnicity = "Pardo";
        const email = "JohnDoe@gmail.com"
        const observation = {
            comorbidity: "Nenhuma",
            allergies: "Abelha",
            medications: "Ibuprofeno"
        };
        const patient = await patientService.create(name, birthDay, sex, cpf, ethnicity, email, observation);
        await expect(patientService.delete(patient.id, "123456", secretary.id)).resolves.toBeUndefined();
    });
    
});
