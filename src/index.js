import { GraphQLServer } from "graphql-yoga";

// Type definitions (schema)
// All possible types: 
// (scalar) - String, Bolean, Int, Float, ID
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        cardText: String!
        flavourText: String
        convertedManaCost: Int!
        standardLegal: Boolean!
        price: Float  
    }
`;

// Resolvers
const resolvers = {
  Query: {
    id() {
        return 1
    },
    name() {
      return "Ranging Raptors";
    },
    convertedManaCost() {
        return 3
    },
    standardLegal() {
        return true
    },
    price() {
        return 0.32
    },
    cardText() {
        return "Enrage - Whenever Ranging Raptors is dealt damage, you may search your library for a basic land card, put i tonto the battlefield tapped, then shuffle your library."
    },
    flavourText() {
        return "They cover their territory like a tide of teeth and claws."
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
  console.log("Server is running");
});
