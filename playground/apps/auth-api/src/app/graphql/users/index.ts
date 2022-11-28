import Mutation from "./mutations";

const typeDefs = `#graphql

type Query {
  users: [User]
}

type Mutation {
  signUp(data: SignUpInput): User!
}

type User {
  id: String
  email: String
}

input SignUpInput {
  email: String!
  password: String!
}

`;

const resolvers = {
  Query: {
  },
  Mutation
};

export {typeDefs, resolvers}
