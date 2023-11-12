import { ApolloServer } from "@apollo/server";
import { User } from "./User";
import { Company } from "./Company";

export const createGraphQLSever = async () => {
  const graphQLSever = new ApolloServer({
    typeDefs: `
        ${User.typeDefs}
        ${Company.typeDefs}
        type Query{
          ${User.queries}   
          ${Company.queries}   
        }
        type Mutation{
          ${User.mutations}
          ${Company.mutations}
        }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Company.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Company.resolvers.mutations,
      },
    },
  });

  await graphQLSever.start();

  return graphQLSever;
};
