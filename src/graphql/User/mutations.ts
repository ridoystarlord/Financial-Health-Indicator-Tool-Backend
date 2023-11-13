export const mutations = `
    RegisterUser(name:String!,email:String!,password:String!,companyName:String!):CreateUserResponse
    LoginUser(email:String!,password:String!):UserLoginResponse
`;
