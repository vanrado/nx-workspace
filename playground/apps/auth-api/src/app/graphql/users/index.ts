import Mutation from "./mutations";

const users = [
  {id: '1', email: 'rr'}, {id: '2', email: 'rr'}, {id: '3', email: 'rr'}
];

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
    users: () => users
  },
  Mutation
};

export {typeDefs, resolvers}
