/*
  Warnings:

  - You are about to drop the column `followUp` on the `Consultation` table. All the data in the column will be lost.
  - Added the required column `hasFollowUp` to the `Consultation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consultation" DROP COLUMN "followUp",
ADD COLUMN     "hasFollowUp" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Observation" ALTER COLUMN "comorbidity" DROP NOT NULL,
ALTER COLUMN "allergies" DROP NOT NULL,
ALTER COLUMN "medications" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "prescription" DROP NOT NULL;
