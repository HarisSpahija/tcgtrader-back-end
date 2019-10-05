import { GraphQLServer, PubSub } from "graphql-yoga";
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription'
import User from './resolvers/User';
import OfferList from './resolvers/OfferList';
import WantList from './resolvers/WantList';
import Card from './resolvers/Card';

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Card,
    OfferList,
    WantList,
  },
  context: {
    db,
    pubsub
  }
});

server.start(() => {
  console.log("Server is running");
});
