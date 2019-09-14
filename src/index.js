import { GraphQLServer } from "graphql-yoga";
import { PossibleFragmentSpreads } from "graphql/validation/rules/PossibleFragmentSpreads";

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

const requestLists = [
  {
    id: "1",
    owner: "1",
    cards: ["1", "2", "3"]
  },
  {
    id: "2",
    owner: "4",
    cards: ["1"]
  },
  {
    id: "3",
    owner: "5",
    cards: ["2"]
  }
];

const wantLists = [
  {
    id: "1",
    owner: "2",
    cards: ["1", "3"]
  },
  {
    id: "2",
    owner: "3",
    cards: ["1"]
  },
  {
    id: "3",
    owner: "4",
    cards: ["2", "3"]
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
    flavourText:
      "Take two steps north into the unsettled future, south into the unquiet past, easy into the present day, or west into the great unknown.",
    standardLegal: false,
    price: 0.5
  }
];
// Type definitions (schema)
// All possible types:
// (scalar) - String, Bolean, Int, Float, ID
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        cards(query: String): [Card!]!
        requestLists: [RequestLists]
        wantLists: [WantLists]
        me: User!
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
        requestList: RequestLists
        wantList: WantLists
    }

    type RequestLists {
      id: ID!
      owner: User!
      cards: [Card!]!
    }

    type WantLists {
      id: ID!
      owner: User!
      cards: [Card!]!
    }
`;

// Resolvers
// parent = contains arguments supplied from parent resolver
// arg = contains arguments supplied from query
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
        const isNamematch = card.name
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isTypeMatch = card.type
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isNamematch || isTypeMatch;
      });
    },
    requestLists() {
      return requestLists;
    },
    wantLists() {
      return wantLists;
    }
  },
  RequestLists: {
    owner(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.owner;
      });
    },
    cards(parent, args, ctx, info) {
      return parent.cards.map(id => (
        cards.find(card => (
          card.id === id
        ))
      ))
    }
  },
  WantLists: {
    owner(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.owner;
      });
    },
    cards(parent, args, ctx, info) {
      return parent.cards.map(id => (
        cards.find(card => (
          card.id === id
        ))
      ))
    }
  },
  User: {
    requestList(parent, args, ctx, info) {
      return requestLists.find(requestList => {
        return requestList.owner === parent.id;
      });
    },
    wantList(parent, args, ctx, info) {
      return wantLists.find(wantList => {
        return wantList.owner === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
  console.log("Server is running");
});
