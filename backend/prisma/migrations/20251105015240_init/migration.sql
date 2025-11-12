-- CreateTable
CREATE TABLE "Secretary" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Secretary_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Medic" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,

    CONSTRAINT "Medic_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Patient" (
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
CREATE TABLE "Observation" (
    "_id" TEXT NOT NULL,
    "comorbidity" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "medications" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "followUp" BOOLEAN NOT NULL,
    "medicId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Report" (
    "_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "prescription" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Secretary_email_key" ON "Secretary"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medic_email_key" ON "Medic"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_cpf_key" ON "Patient"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Observation_patientId_key" ON "Observation"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_consultationId_key" ON "Report"("consultationId");

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_medicId_fkey" FOREIGN KEY ("medicId") REFERENCES "Medic"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
