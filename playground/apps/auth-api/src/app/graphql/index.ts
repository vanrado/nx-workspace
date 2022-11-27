const users = [
  { id: '1'}, { id: '2'}, { id: '3'}
];
const typeDefs = `#graphql
type User {
  id: String
}

type Query {
  users: [User]
}
`;
const resolvers = {
  Query: {
    users: () => users
  }
};

export { typeDefs, resolvers }
