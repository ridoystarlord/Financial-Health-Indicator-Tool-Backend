import { getUserToken } from "./../../Services/User";
import { UserService, createUserPayload } from "../../Services/User";

const queries = {
  getUserToken: async (_: any, payload: getUserToken) => {
    return await UserService.getUserToken(payload);
  },
  getUser: async (_: any, payload: any, context: any) => {
    return await UserService.getCurrentUser(context.id);
  },
};
const mutations = {
  createUser: async (_: any, payload: createUserPayload) => {
    await UserService.createUser(payload);
    return { success: true, message: "User Register Successful", error: null };
  },
};

export const resolvers = { queries, mutations };
