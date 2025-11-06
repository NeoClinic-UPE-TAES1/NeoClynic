// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../src/infra/database/prismaClient";
import { PatientService } from "../../../src/modules/patient/service/PatientService";
import { MedicService } from "../../../src/modules/medic/service/MedicService";
import { ConsultationService } from "../../../src/modules/consultation/service/ConsultationService";
import { PatientRepository } from "../../../src/modules/patient/domain/repository/PatientRepository";
import { MedicRepository } from "../../../src/modules/medic/domain/repository/MedicRepository";
import { ObservationRepository } from "../../../src/modules/observation/domain/repository/ObservationRepository";
import { ConsultationRepository } from "../../../src/modules/consultation/domain/repository/ConsultationRepository";
import { ReportRepository } from "../../../src/modules/report/domain/repository/ReportRepository";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let patientRepository: PatientRepository;
    let patientService: PatientService;
    let medicService: MedicService;
    let consultationService: ConsultationService;
    let observationRepository: ObservationRepository;
    let consultationRepository: ConsultationRepository;
    let medicRepository: MedicRepository;
    let reportRepository: ReportRepository;

    beforeAll(() => {
        prismaClient = prisma;
        patientRepository = new PatientRepository();
        observationRepository = new ObservationRepository();
        medicRepository = new MedicRepository();
        reportRepository = new ReportRepository();
        consultationRepository = new ConsultationRepository();
        patientService = new PatientService(patientRepository, observationRepository, consultationRepository);
        medicService = new MedicService(medicRepository);
        consultationService = new ConsultationService(consultationRepository, reportRepository, patientRepository, medicRepository);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });
    beforeEach(async () => {
        await prismaClient.report.deleteMany();
        await prismaClient.consultation.deleteMany();
        await prismaClient.observation.deleteMany();
        await prismaClient.patient.deleteMany();
        await prismaClient.medic.deleteMany();
    });

    test("List All Patient", async () => {
        const name1 = "John Doe";
        const birthDay1 = new Date("2032-10-21T17:45:30.123Z");
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

        const patienties = await patientService.listAll('ID', 'SECRETARY');
        expect(patienties.length).toBe(2);
        const emails = patienties.map(s => s.email);
        expect(emails).toContain(email1);
        expect(emails).toContain(email2);
    });

    test("List One Patient", async () => {
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
        const foundPatient = await patientService.list(patient.id, 'ID', 'SECRETARY');
        expect(foundPatient.email).toBe(email);

        await expect(patientService.list("non-existing-id", 'ID', 'SECRETARY')).rejects.toThrow("Patient not exists.");
    });

    test("List Patients with Medic consultation", async () => {
        const name1 = "John Doe";
        const birthDay1 = new Date("2032-10-21T17:45:30.123Z");
        const sex1 = "M";
        const cpf1 = "12345678900";
        const ethnicity1 = "Pardo";
        const email1 = "JohnDoe@gmail.com"
        const observation1 = {
            comorbidity: "Nenhuma",
            allergies: "Abelha",
            medications: "Ibuprofeno"
        };
        const patient1 = await patientService.create(name1, birthDay1, sex1, cpf1, ethnicity1, email1, observation1);
        const medic = await medicService.create("Jane Doe", "JaneDoe@gmail.com", "1234567890", "Cardiology");
        await consultationService.create(new Date("2032-10-21T17:45:30.123Z"), true, medic.id, patient1.id, undefined, 'MEDIC');

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

        const patienties = await patientService.listAll(medic.id, 'MEDIC');
        expect(patienties.length).toBe(1);
        const emails = patienties.map(s => s.email);
        expect(emails).toContain(email1);
        expect(emails).not.toContain(email2);
    });

    test("List One Patient with Medic Consultation", async () => {
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
        const medic = await medicService.create("Jane Doe", "JaneDoe@gmail.com", "1234567890", "Cardiology");
        await consultationService.create(new Date("2032-10-21T17:45:30.123Z"), true, medic.id, patient.id, undefined, 'MEDIC');

        const foundPatient = await patientService.list(patient.id, medic.id, 'MEDIC');
        expect(foundPatient.email).toBe(email);

        await expect(patientService.list("non-existing-id", medic.id, 'MEDIC')).rejects.toThrow("Patient not exists.");
    });

});
