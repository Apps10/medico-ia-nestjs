/*
  Warnings:

  - You are about to drop the `historyPatient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "historyPatient" DROP CONSTRAINT "historyPatient_patientId_fkey";

-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "medicalHistory" TEXT[];

-- DropTable
DROP TABLE "historyPatient";
