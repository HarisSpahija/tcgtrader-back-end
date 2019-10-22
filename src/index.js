import { GraphQLServer, PubSub } from "graphql-yoga";
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription'
import User from './resolvers/User';
import OfferList from './resolvers/OfferList';
import WantList from './resolvers/WantList';
import Card from './resolvers/Card';
require('dotenv').config();

const pubsub = new PubSub()

//This code works fine. just look, push it over on hosting panel and it works fine. 
const opts = {
  port: process.env.PORT || 8080
};

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

server.start(opts.port, () => {
  console.log(`Server is running at http://localhost:${opts.port}/`);
});
