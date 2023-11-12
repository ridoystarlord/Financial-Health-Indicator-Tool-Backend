import { UserService } from "./Services/User";
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { createGraphQLSever } from "./graphql";
import { PORT } from "./config";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const initSever = async () => {
  app.use(
    "/graphql",
    expressMiddleware(await createGraphQLSever(), {
      context: async ({ req }) => {
        const token = req?.headers?.authorization;

        try {
          if (token && typeof token === "string") {
            const finalToken = token?.split("Bearer ")[1];
            const user = UserService.getUserFromToken(finalToken);
            return user;
          }
          return {};
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`Financial Health Indicator Tool Server Running ${PORT}`);
  });
};

initSever();
