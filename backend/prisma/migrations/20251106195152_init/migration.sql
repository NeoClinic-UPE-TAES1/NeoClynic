/*
  Warnings:

  - A unique constraint covering the columns `[resetToken]` on the table `Medic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resetToken]` on the table `Secretary` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Medic" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiresAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Secretary" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiresAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Admin" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "twoFactorSecret" TEXT,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_resetToken_key" ON "Admin"("resetToken");

-- CreateIndex
CREATE UNIQUE INDEX "Medic_resetToken_key" ON "Medic"("resetToken");

-- CreateIndex
CREATE UNIQUE INDEX "Secretary_resetToken_key" ON "Secretary"("resetToken");
