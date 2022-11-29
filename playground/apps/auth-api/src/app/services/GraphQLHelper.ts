import {ApolloServer, BaseContext} from "@apollo/server";
import {resolvers, typeDefs} from "../graphql";
import http from 'http';
import {Express} from "express";
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';

export class GraphQLHelper {
  static initApolloServer(app: Express, httpServer: http.Server): ApolloServer {
    const server = new ApolloServer<BaseContext>({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    });

    // Ensure we wait for our server to start
    return server;
  }
}
