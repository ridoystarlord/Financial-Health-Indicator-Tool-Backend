import { prismaClient } from "../Database";

export interface createMonthlyDataUserPayload {
  income: number;
  expenses: number;
  debts: number;
  assets: number;
  monthName: string;
}
export interface createMonthlyDataDBPayload
  extends createMonthlyDataUserPayload {
  companyId: string;
  healthScore: number;
}

export class CompanyService {
  private static getCompanyFromID(id: string) {
    return prismaClient.company.findUnique({ where: { id } });
  }
  private static getMonthlyData(id: string) {
    return prismaClient.monthlyFinancialData.findMany({
      where: { companyId: id },
    });
  }
  public static async createMonthData(payload: createMonthlyDataDBPayload) {
    const {
      income,
      expenses,
      debts,
      assets,
      companyId,
      monthName,
      healthScore,
    } = payload;
    const isCompanyExist = await CompanyService.getCompanyFromID(companyId);
    if (!isCompanyExist) {
      throw new Error("Company Not Found");
    }
    return prismaClient.monthlyFinancialData.create({
      data: {
        income,
        expenses,
        debts,
        assets,
        companyId,
        monthName,
        healthScore,
      },
    });
  }
  public static async getCompanyMonthlyData(id: string) {
    const monthlyData = await CompanyService.getMonthlyData(id);
    return monthlyData;
  }
}
