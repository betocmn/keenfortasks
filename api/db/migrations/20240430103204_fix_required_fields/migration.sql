/*
  Warnings:

  - Made the column `accountId` on table `Agent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountId` on table `Schedule` required. This step will fail if there are existing NULL values in that column.
  - Made the column `agentId` on table `Schedule` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountId` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `scheduleId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Agent" DROP CONSTRAINT "Agent_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_agentId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "accountId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "accountId" SET NOT NULL,
ALTER COLUMN "agentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "accountId" SET NOT NULL,
ALTER COLUMN "scheduleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
