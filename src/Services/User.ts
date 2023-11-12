import { prismaClient } from "../Database";
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export interface createUserPayload {
  name: string;
  email: string;
  password: string;
  companyName: string;
}

export interface getUserToken {
  email: string;
  password: string;
}

export class UserService {
  private static getUserFromEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }
  private static getUserFromID(id: string) {
    return prismaClient.user.findUnique({
      where: { id },
      include: { company: true },
    });
  }
  private static getHashFromPassword(salt: string, password: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }
  public static async createUser(payload: createUserPayload) {
    const { name, email, password, companyName } = payload;
    const isUserExist = await UserService.getUserFromEmail(email);
    if (isUserExist) {
      throw new Error("Email Already Exists. Use another one");
    }
    const salt = randomBytes(32).toString("hex");
    const hashPassword = UserService.getHashFromPassword(salt, password);
    return prismaClient.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        salt,
        company: {
          create: {
            companyName,
          },
        },
      },
    });
  }
  public static async getUserToken(payload: getUserToken) {
    const { email, password } = payload;
    const user = await UserService.getUserFromEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const salt = user.salt;
    const hashPassword = UserService.getHashFromPassword(salt, password);
    if (hashPassword !== user.password) {
      throw new Error("Wrong Credentials");
    }
    const token = JWT.sign({ id: user.id }, JWT_SECRET);
    return { success: true, message: "User Login Successful", token };
  }

  public static getUserFromToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }

  public static async getCurrentUser(id: string) {
    const user = await UserService.getUserFromID(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
