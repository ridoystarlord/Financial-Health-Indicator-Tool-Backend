import dotenv from "dotenv";
dotenv.config();

export const PORT = 8000;
export const JWT_SECRET = process.env.JWT_SECRET as string;
