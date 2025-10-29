// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../src/infra/database/prismaClient";
import { PatientService } from "../../../src/modules/patient/service/PatientService";
import { PatientRepository } from "../../../src/modules/patient/domain/repository/PatientRepository";
import { ObservationRepository } from "../../../src/modules/observation/domain/repository/ObservationRepository";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let patientRepository: PatientRepository;
    let patientService: PatientService;
    let observationRepository: ObservationRepository;

    beforeAll(() => {
        prismaClient = prisma;
        patientRepository = new PatientRepository();
        observationRepository = new ObservationRepository();
        patientService = new PatientService(patientRepository, observationRepository);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });
    beforeEach(async () => {
        await prismaClient.observation.deleteMany();
        await prismaClient.patient.deleteMany();
    });

    test("List All Patient", async () => {
        const name1 = "John Doe";
        const birthDay1 = new Date("2025-10-21T17:45:30.123Z");
        const sex1 = "M";
        const cpf1 = "12345678900";
        const ethnicity1 = "Pardo";
        const email1 = "JohnDoe@gmail.com"
        const observation1 = {
            comorbidity: "Nenhuma",
            allergies: "Abelha",
            medications: "Ibuprofeno"
        };
        await patientService.create(name1, birthDay1, sex1, cpf1, ethnicity1, email1, observation1);

        const name2 = "Jane Smith";
        const birthDay2 = new Date("1990-05-15T10:20:30.123Z");
        const sex2 = "F";
        const cpf2 = "09876543211";
        const ethnicity2 = "Branca";
        const email2 = "JaneDoe@gmail.com";
        const observation2 = {
            comorbidity: "Diabetes",
            allergies: "Poeira",
            medications: "Metformina"
        };
        await patientService.create(name2, birthDay2, sex2, cpf2, ethnicity2, email2, observation2);

        const patienties = await patientService.listAll();
        expect(patienties.length).toBe(2);
        const emails = patienties.map(s => s.email);
        expect(emails).toContain(email1);
        expect(emails).toContain(email2);
    });
    test("List One Patient", async () => {
        const name = "John Doe";
        const birthDay = new Date("2025-10-21T17:45:30.123Z");
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
        const foundPatient = await patientService.list(patient.id);
        expect(foundPatient.email).toBe(email);

        await expect(patientService.list("non-existing-id")).rejects.toThrow("Patient not exists.");
    }
    );
});
