import { GraphQLServer } from "graphql-yoga";

// Type definitions (schema)
// All possible types: 
// (scalar) - String, Bolean, Int, Float, ID
const typeDefs = `
    type Query {
        cardName: String!
        convertedManaCost: Int!
        cardText: String!
        flavourText: String!     
    }
`;

// Resolvers
const resolvers = {
  Query: {
    cardName() {
      return "Ranging Raptors";
    },
    convertedManaCost() {
        return 3
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
