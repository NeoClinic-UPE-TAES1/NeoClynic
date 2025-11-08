-- DropForeignKey
ALTER TABLE "public"."Observation" DROP CONSTRAINT "Observation_patientId_fkey";

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
