/*
  Warnings:

  - You are about to drop the `secretary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."secretary";

-- CreateTable
CREATE TABLE "public"."Secretary" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Secretary_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Secretary_email_key" ON "public"."Secretary"("email");
