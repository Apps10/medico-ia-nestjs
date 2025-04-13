-- CreateTable
CREATE TABLE "historyPatient" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "historyPatient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "historyPatient_patientId_idx" ON "historyPatient"("patientId");

-- AddForeignKey
ALTER TABLE "historyPatient" ADD CONSTRAINT "historyPatient_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
