export const typeDefs = `
    type Company{
        id: ID!
        companyName: String!
    }
    type User{
        id: ID!
        name: String!
        email: String!
        company: Company
    }
    type CreateUserResponse{
        success: Boolean!
        message: String!
        error: String
    }
    type UserLoginResponse{
        success: Boolean!
        message: String!
        token: String!
    }
    
`;
