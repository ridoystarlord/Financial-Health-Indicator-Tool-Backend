export const typeDefs = `
    type CreateMonthlyDataResponse{
        success: Boolean!
        message: String!
        error: String
    }
    type MonthlyData{
        id: String!
        income: Float!
        expenses: Float!
        debts: Float!
        assets: Float!
    }
    type HealthData{
        monthName: String!
        healthScore: Float!
    }
`;
