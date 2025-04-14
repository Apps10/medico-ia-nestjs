-- CreateEnum
CREATE TYPE "statusIaLog" AS ENUM ('success', 'error');

-- CreateEnum
CREATE TYPE "IProviderIaLog" AS ENUM ('openAI', 'deepseek', 'gemini', 'mock');

-- CreateTable
CREATE TABLE "iaLog" (
    "id" SERIAL NOT NULL,
    "provider" "IProviderIaLog" NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT,
    "status" "statusIaLog" NOT NULL,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "iaLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "iaLog_provider_status_createdAt_idx" ON "iaLog"("provider", "status", "createdAt");
