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

const cards = [
  {
    id: "1",
    name: "Ranging Raptors",
    type: "Creature - Dinosaur",
    cardText:
      "Enrage - Whenever Ranging Raptors is dealt damage, you may search your library for a basic land card, put i tonto the battlefield tapped, then shuffle your library.",
    flavourText: "They cover their territory like a tide of teeth and claws.",
    convertedManaCost: 3,
    standardLegal: true,
    price: 0.35
  },
  {
    id: "2",
    name: "Lesser Masticore",
    type: "Artifact Creature - Masticore",
    cardText:
      "As an additional cost to cast this spell, discard a card. {4}: Lesser Masticore deals 1 damage to target creature. Persist",
    convertedManaCost: 2,
    standardLegal: false,
    price: 0.15
  },
  {
    id: "3",
    name: "Terramorphic Expanse",
    type: "Land",
    cardText:
      "{T}, Sacrifice Terramorphic Expanse: Search your library for a basic land card and put it onto the battlefield tapped. Then shuffle your library.",
    flavourText: "Take two steps north into the unsettled future, south into the unquiet past, easy into the present day, or west into the great unknown.",
    standardLegal: false,
    price: 0.50
  }
];
// Type definitions (schema)
// All possible types:
// (scalar) - String, Bolean, Int, Float, ID
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        cards(query: String): [Card!]!
    }

    type Card {
        id: ID!
        name: String!
        type: String!
        cardText: String!
        flavourText: String
        convertedManaCost: Int
        standardLegal: Boolean!
        price: Float!  
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
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    cards(parent, args, ctx, info) {
      if (!args.query) {
        return cards;
      }

      return cards.filter(card => {
        const isNamematch = card.name.toLowerCase().includes(args.query.toLowerCase());
        const isTypeMatch = card.type.toLowerCase().includes(args.query.toLowerCase());
        return isNamematch || isTypeMatch
      });
    },
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
