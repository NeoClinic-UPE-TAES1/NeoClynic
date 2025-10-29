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

    test("Update Patient", async () => {
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
        const newName = "Jane Doe";
        const updatedPatient = await patientService.update(patient.id, newName, undefined, undefined, undefined, undefined, undefined, undefined);
        expect(updatedPatient.name).toBe(newName);
        expect(updatedPatient.email).toBe(email);
    });

    test("Update Patient with Observation", async () => {
        const name = "John Doe";
        const birthDay = new Date("2025-10-21T17:45:30.123Z");
        const sex = "M";
        const cpf = "12345678900";
        const ethnicity = "Pardo";
        const email = "JohnDoe@gmail.com"
        const observation1 = {
            comorbidity: "Cegueira",
            allergies: "Abelha",
            medications: "Ibuprofeno"
        };
        const patient = await patientService.create(name, birthDay, sex, cpf, ethnicity, email, observation1);
        const newName = "Jane Doe";
        const observation2 = {
            comorbidity: "Reumatismo"
        };
        const updatedPatient = await patientService.update(patient.id, newName, undefined, undefined, undefined, undefined, undefined, observation2);
        expect(updatedPatient.name).toBe(newName);
        expect(updatedPatient.email).toBe(email);
        expect(updatedPatient.observation?.comorbidity).toBe("Reumatismo");
        expect(updatedPatient.observation?.allergies).toBe("Abelha");
    }
    );
    
});
