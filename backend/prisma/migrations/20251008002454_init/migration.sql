/*
  Warnings:

  - You are about to drop the column `patientId` on the `Observation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[observationId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Observation" DROP CONSTRAINT "Observation_patientId_fkey";

-- DropIndex
DROP INDEX "public"."Observation_patientId_key";

-- AlterTable
ALTER TABLE "Observation" DROP COLUMN "patientId";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "observationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_observationId_key" ON "Patient"("observationId");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_observationId_fkey" FOREIGN KEY ("observationId") REFERENCES "Observation"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
