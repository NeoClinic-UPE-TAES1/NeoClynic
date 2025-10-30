// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../src/infra/database/prismaClient";
import { ConsultationService } from "../../../src/modules/consultation/service/ConsultationService";
import { PatientService } from "../../../src/modules/patient/service/PatientService";
import { MedicService } from "../../../src/modules/medic/service/MedicService";
import { ConsultationRepository } from "../../../src/modules/consultation/domain/repository/ConsultationRepository";
import { ReportRepository } from "../../../src/modules/report/domain/repository/ReportRepository";
import { ObservationRepository } from "../../../src/modules/observation/domain/repository/ObservationRepository";
import { PatientRepository } from "../../../src/modules/patient/domain/repository/PatientRepository";
import { MedicRepository } from "../../../src/modules/medic/domain/repository/MedicRepository";


describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let consultationService: ConsultationService;
    let patientService: PatientService;
    let medicService: MedicService;
    let consultationRepository: ConsultationRepository;
    let reportRepository: ReportRepository;
    let observationRepository: ObservationRepository;
    let patientRepository: PatientRepository;
    let medicRepository: MedicRepository;

    beforeAll(() => {
        prismaClient = prisma;
        consultationRepository = new ConsultationRepository();
        reportRepository = new ReportRepository();
        observationRepository = new ObservationRepository();
        patientRepository = new PatientRepository();
        medicRepository = new MedicRepository();
        consultationService = new ConsultationService(consultationRepository, reportRepository, patientRepository, medicRepository);
        patientService = new PatientService(patientRepository, observationRepository);
        medicService = new MedicService(medicRepository);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });
    beforeEach(async () => {
        await prismaClient.patient.deleteMany();
        await prismaClient.medic.deleteMany();
        await prismaClient.observation.deleteMany();
        await prismaClient.report.deleteMany();
        await prismaClient.consultation.deleteMany();
    });

    test("Create Consultation", async () => {
        const date = new Date("2032-10-21T17:45:30.123Z");
        const hasFollowUp = true;
        const report = {
            description: "Patient shows symptoms of flu.",
            diagnosis: "Influenza",
            prescription: "Rest and hydration"
        };
        
        const medic = await medicService.create("Jane Doe", "janeDoe@gmail.com", "123", "Cardiology");
        const patient = await patientService.create("Jane Doee", new Date("2032-10-21T17:45:30.123Z"), "F", "1234567890", "white", "janeDoee@gmail.com", undefined);

        const consultation = await consultationService.create(date, hasFollowUp, patient.id, medic.id, report);
        expect(consultation).toHaveProperty("id");
        expect(consultation.date).toBe(date);
        expect(consultation.report).toBe(report);
    });

    test("Create Consultation without Report", async () => {
        const date = new Date("2032-10-21T17:45:30.123Z");
        const hasFollowUp = true;
        
        const medic = await medicService.create("Jane Doe", "janeDoe@gmail.com", "123", "Cardiology");
        const patient = await patientService.create("Jane Doee", new Date("2032-10-21T17:45:30.123Z"), "F", "1234567890", "white", "janeDoee@gmail.com", undefined);

        const consultation = await consultationService.create(date, hasFollowUp, patient.id, medic.id, undefined);
        expect(consultation).toHaveProperty("id");
        expect(consultation.date).toBe(date);
        expect(consultation.report).toBe(undefined);
    });
});
