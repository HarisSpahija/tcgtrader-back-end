import { GraphQLServer } from "graphql-yoga";

// Demo user data
const users = [
  {
    id: "1",
    name: "Haris Spahija",
    email: "haris@example.com"
  },
  {
    id: "2",
    name: "George",
    email: "george@example.com"
  },
  {
    id: "3",
    name: "Vladimir",
    email: "vladimir@example.com"
  },
  {
    id: "4",
    name: "Hristo",
    email: "hristo@example.com"
  },
  {
    id: "5",
    name: "Sophie",
    email: "sophie@example.com"
  }
];
// Type definitions (schema)
// All possible types:
// (scalar) - String, Bolean, Int, Float, ID
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        card: Card!
    }

    type Card {
        id: ID!
        name: String!
        cardText: String!
        flavourText: String
        convertedManaCost: Int!
        standardLegal: Boolean!
        price: Float  
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        collection: Card!
    }
`;

// Resolvers
// parent =
// arg = contains arguments supplied to query
// ctx = context for contextual data such as login tokens
// info = information about the operation sent to server
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    me() {
      return {
        id: "1231241",
        name: "Haris Spahija",
        email: "haris.spahija@hybrit.org",
        age: 22
      };
    },
    card() {
      return {
        id: "1",
        name: "Ranging Raptors",
        cardText:
          "Enrage - Whenever Ranging Raptors is dealt damage, you may search your library for a basic land card, put i tonto the battlefield tapped, then shuffle your library.",
        flavourText:
          "They cover their territory like a tide of teeth and claws.",
        convertedManaCost: 3,
        standardLegal: true,
        price: 0.35
      };
    }
  },
  Card: {
    id() {
      return 1;
    },
    name() {
      return "Ranging Raptors";
    },
    convertedManaCost() {
      return 3;
    },
    standardLegal() {
      return true;
    },
    price() {
      return 0.32;
    },
    cardText() {
      return "Enrage - Whenever Ranging Raptors is dealt damage, you may search your library for a basic land card, put i tonto the battlefield tapped, then shuffle your library.";
    },
    flavourText() {
      return "They cover their territory like a tide of teeth and claws.";
    }
  },
  User: {
    collection() {
      return {
        id: "1",
        name: "Ranging Raptors",
        cardText:
          "Enrage - Whenever Ranging Raptors is dealt damage, you may search your library for a basic land card, put i tonto the battlefield tapped, then shuffle your library.",
        flavourText:
          "They cover their territory like a tide of teeth and claws.",
        convertedManaCost: 3,
        standardLegal: true,
        price: 0.35
      };
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
  console.log("Server is running");
});
