-- CreateTable
CREATE TABLE "public"."secretary" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "secretary_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."Medic" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,

    CONSTRAINT "Medic_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."Patient" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDay" TIMESTAMP(3) NOT NULL,
    "sex" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "ethnicity" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."Observation" (
    "_id" TEXT NOT NULL,
    "comorbidity" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "medications" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."Consultation" (
    "_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "followUp" BOOLEAN NOT NULL,
    "medicId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."Report" (
    "_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "prescription" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "secretary_email_key" ON "public"."secretary"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medic_email_key" ON "public"."Medic"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_cpf_key" ON "public"."Patient"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "public"."Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Observation_patientId_key" ON "public"."Observation"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_consultationId_key" ON "public"."Report"("consultationId");

-- AddForeignKey
ALTER TABLE "public"."Observation" ADD CONSTRAINT "Observation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Consultation" ADD CONSTRAINT "Consultation_medicId_fkey" FOREIGN KEY ("medicId") REFERENCES "public"."Medic"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Consultation" ADD CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "public"."Consultation"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
