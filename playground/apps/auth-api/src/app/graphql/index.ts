import * as Users from "./users"

const typeDefs = `#graphql
  scalar JSON
  scalar JSONObject

  ${Users.typeDefs}
`;

const resolvers = Users.resolvers;
export { typeDefs, resolvers };
