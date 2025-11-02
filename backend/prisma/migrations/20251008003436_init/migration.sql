/*
  Warnings:

  - You are about to drop the column `observationId` on the `Patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[patientId]` on the table `Observation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `patientId` to the `Observation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Patient" DROP CONSTRAINT "Patient_observationId_fkey";

-- DropIndex
DROP INDEX "public"."Patient_observationId_key";

-- AlterTable
ALTER TABLE "Observation" ADD COLUMN     "patientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "observationId";

-- CreateIndex
CREATE UNIQUE INDEX "Observation_patientId_key" ON "Observation"("patientId");

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
