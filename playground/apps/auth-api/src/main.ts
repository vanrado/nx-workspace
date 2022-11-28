import express = require("express");
import {DBHelper} from "./app/services/DBHelper";
import {SessionHelper} from "./app/services/SessionHelper";
import {AuthHelper} from "./app/services/AuthHelper";
import {UserSchema} from "./app/models/user-schema";
import http from "http";
import {GraphQLHelper} from "./app/services/GraphQLHelper";
import {expressMiddleware} from "@apollo/server/express4";
import bodyParser from "body-parser";

const port = process.env.port || 4000;
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);
const asyncInit = async () => {
  const apolloServer = await GraphQLHelper.initApolloServer(app, httpServer);
  await DBHelper.init();
  SessionHelper.init(app);
  UserSchema.init();
  AuthHelper.init(app);
  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    '/graphql',
    // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
    bodyParser.json({ limit: '50mb' }),
    expressMiddleware(apolloServer, {
      context: async ({req}) => ({...req, token: req.headers.token}),
    }),
  );
  await new Promise<void>((resolve) => httpServer.listen({port}, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/`);
};
asyncInit().then(() => console.log('Everything was initialized :-)')).catch(error => console.error('shit happened', error));

