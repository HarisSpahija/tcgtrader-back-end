import { GraphQLServer } from "graphql-yoga";
import db from './db';
import Card from './resolvers/Card';
import Mutation from './resolvers/Mutation';
import OfferList from './resolvers/OfferList';
import Query from './resolvers/Query';
import User from './resolvers/User';
import WantList from './resolvers/WantList';

// Resolvers
// parent = contains arguments supplied from parent resolver
// arg = contains arguments supplied from query
// ctx = context for contextual data such as login tokens
// info = information about the operation sent to server

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Card,
    Mutation,
    OfferList,
    Query,
    User,
    WantList,
  },
  context: {
    db
  }
});

server.start(() => {
  console.log("Server is running");
});
