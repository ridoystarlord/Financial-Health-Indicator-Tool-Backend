/*
  Warnings:

  - You are about to drop the column `assets` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `debts` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `expenses` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `Company` table. All the data in the column will be lost.
  - Added the required column `companyName` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "assets",
DROP COLUMN "debts",
DROP COLUMN "expenses",
DROP COLUMN "income",
ADD COLUMN     "companyName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MonthlyFinancialData" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "expenses" DOUBLE PRECISION NOT NULL,
    "debts" DOUBLE PRECISION NOT NULL,
    "assets" DOUBLE PRECISION NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "MonthlyFinancialData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyFinancialData_companyId_key" ON "MonthlyFinancialData"("companyId");

-- AddForeignKey
ALTER TABLE "MonthlyFinancialData" ADD CONSTRAINT "MonthlyFinancialData_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
