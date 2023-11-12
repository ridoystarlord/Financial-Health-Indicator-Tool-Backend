import {
  CompanyService,
  createMonthlyDataUserPayload,
} from "../../Services/Company";
import { UserService } from "../../Services/User";
import { calculateHealthScoreForAMonth } from "../../utils";

const queries = {
  getCompanyMonthlyData: async (_: any, payload: any, context: any) => {
    if (!context.id) {
      throw new Error("Unauthorized");
    }
    const user = await UserService.getCurrentUser(context.id);
    if (!user) {
      throw new Error("Unauthorized");
    }
    if (user?.company?.id) {
      return await CompanyService.getCompanyMonthlyData(user?.company?.id);
    }
  },
  getCompanyHealthData: async (_: any, payload: any, context: any) => {
    if (!context.id) {
      throw new Error("Unauthorized");
    }
    const user = await UserService.getCurrentUser(context.id);
    if (!user) {
      throw new Error("Unauthorized");
    }
    if (user?.company?.id) {
      return await CompanyService.getCompanyMonthlyData(user?.company?.id);
    }
  },
};
const mutations = {
  createMonthlyData: async (
    _: any,
    payload: createMonthlyDataUserPayload,
    context: any
  ) => {
    if (!context.id) {
      throw new Error("Unauthorized");
    }
    const user = await UserService.getCurrentUser(context.id);
    if (!user) {
      throw new Error("Unauthorized");
    }
    if (!user?.company?.id) {
      throw new Error("User doesn't have company");
    }
    const { income, expenses, debts, assets, ...rest } = payload;
    const score = calculateHealthScoreForAMonth(
      income,
      expenses,
      debts,
      assets
    );
    await CompanyService.createMonthData({
      ...payload,
      companyId: user?.company?.id,
      healthScore: score,
    });
    return {
      success: true,
      message: "Monthly Data Added Successful",
      error: null,
    };
  },
};

export const resolvers = { queries, mutations };
