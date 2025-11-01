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
        await prismaClient.report.deleteMany();
        await prismaClient.consultation.deleteMany();
        await prismaClient.observation.deleteMany();
        await prismaClient.patient.deleteMany();
        await prismaClient.medic.deleteMany();
    });

    test("List All Consultation", async () => {
        const date1 = new Date("2032-10-21T17:45:30.123Z");
        const hasFollowUp1 = true;
        const report1 = {
            description: "Patient shows symptoms of flu.",
            diagnosis: "Influenza",
            prescription: "Rest and hydration"
        };
        
        const medic1 = await medicService.create("Jane Doe", "janeDoe@gmail.com", "123", "Cardiology");
        const patient1 = await patientService.create("Jane Doee", new Date("2032-10-21T17:45:30.123Z"), "F", "1234567890", "white", "janeDoee@gmail.com", undefined);

        await consultationService.create(date1, hasFollowUp1, medic1.id, patient1.id, report1);

        const date2 = new Date("2031-10-22T17:45:30.123Z");
        const hasFollowUp2 = false;
        
        const medic2 = await medicService.create("Bella Doe", "BellaDoe@gmail.com", "123", "Cardiology");
        const patient2 = await patientService.create("Duda Doe", new Date("2032-10-21T17:45:30.123Z"), "F", "1234567899", "white", "DudaDoe@gmail.com", undefined);

        await consultationService.create(date2, hasFollowUp2, medic2.id, patient2.id, undefined);

        const consultations = await consultationService.listAll();
        expect(consultations.length).toBe(2);
        const followUps = consultations.map(s => s.hasFollowUp);
        expect(followUps).toContain(true);
        expect(followUps).toContain(false);
    });

    test("List One consultation", async () => {
        const date = new Date("2032-10-21T17:45:30.123Z");
        const hasFollowUp = true;
        const report = {
            description: "Patient shows symptoms of flu.",
            diagnosis: "Influenza",
            prescription: "Rest and hydration"
        };
        
        const medic = await medicService.create("Jane Doe", "janeDoe@gmail.com", "123", "Cardiology");
        const patient = await patientService.create("Jane Doee", new Date("2032-10-21T17:45:30.123Z"), "F", "1234567890", "white", "janeDoee@gmail.com", undefined);

        const consultation = await consultationService.create(date, hasFollowUp, medic.id, patient.id, report);
        
        const foundConsultation = await consultationService.list(consultation.id);
        expect(foundConsultation.report).toMatchObject(report);

        await expect(consultationService.list("non-existing-id")).rejects.toThrow("Consultation not exists.");
    }
    );
});
