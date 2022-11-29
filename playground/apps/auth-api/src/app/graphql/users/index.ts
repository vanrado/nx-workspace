import Mutation from "./mutations";
import {User} from "../../types/user";
import { PassportSubscriptionContext } from "graphql-passport";

const typeDefs = `#graphql

type Query {
  user: User
}

type Mutation {
  signUp(data: SignUpInput): User!
  logOut: User!
  logIn(data: LogInInput): User!
}

type User {
  id: String
  email: String
}

input SignUpInput {
  email: String!
  password: String!
}

input LogInInput {
  email: String!
  password: String!
}

`;

const resolvers = {
  Query: {
    user: (_: object, args: { data: Partial<User> }, req: PassportSubscriptionContext<User, unknown>) => {
      console.log("req", req);
      return req.getUser();
    }
  },
  Mutation
};

export {typeDefs, resolvers}
