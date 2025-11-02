-- DropForeignKey
ALTER TABLE "public"."Consultation" DROP CONSTRAINT "Consultation_medicId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Consultation" DROP CONSTRAINT "Consultation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Report" DROP CONSTRAINT "Report_consultationId_fkey";

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_medicId_fkey" FOREIGN KEY ("medicId") REFERENCES "Medic"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
