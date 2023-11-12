/*
  Warnings:

  - Added the required column `healthScore` to the `MonthlyFinancialData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthName` to the `MonthlyFinancialData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MonthlyFinancialData" ADD COLUMN     "healthScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "monthName" TEXT NOT NULL;
