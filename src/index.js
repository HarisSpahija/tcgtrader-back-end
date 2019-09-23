import { GraphQLServer } from "graphql-yoga";
import db from './db';
import Card from './resolvers/Card';
import Mutation from './resolvers/Mutation';
import OfferList from './resolvers/OfferList';
import Query from './resolvers/Query';
import User from './resolvers/User';
import WantList from './resolvers/WantList';

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
