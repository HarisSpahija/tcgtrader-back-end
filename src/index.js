import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";

// Demo user data
const users = [
    {
        id: "1",
        name: "Haris Spahija",
        email: "haris@example.com",
        age: "22"
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
        email: "sophie@example.com",
        age: "20"
    }
];

const offerLists = [
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
        flavourText:
            "They cover their territory like a tide of teeth and claws.",
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
        offerLists: [OfferList]
        wantLists: [WantList]
        me: User!
    }

    type Mutation {
      createUser(name: String!, email: String!, age: Int): User!
      createCard(name: String!, type: String!, cardText: String!, flavourText: String, convertedManaCost: Int, standardLegal: Boolean!, price: Float!): Card!
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
        offerList: OfferList
        wantList: WantList
    }

    type OfferList {
      id: ID!
      owner: User!
      cards: [Card!]!
      possibleTraders: [User]
    }

    type WantList {
      id: ID!
      owner: User!
      cards: [Card!]!
      possibleTraders: [User]
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
                return user.name
                    .toLowerCase()
                    .includes(args.query.toLowerCase());
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
        offerLists() {
            return offerLists;
        },
        wantLists() {
            return wantLists;
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some(user => user.email === args.email);

            if (emailTaken) {
                throw new Error("Email taken");
            }

            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            };

            users.push(user);

            return user;
        },
        createCard(parent, args, ctx, info) {
            const cardAlreadyExists = cards.some(
                card => card.name === args.name
            );

            if (cardAlreadyExists) {
                throw new Error("This card already exists");
            }

            const card = {
                id: uuidv4(),
                name: args.name,
                type: args.type,
                cardText: args.cardText,
                flavourText: args.flavourText,
                convertedManaCost: args.convertedManaCost,
                standardLegal: args.standardLegal,
                price: args.price
            };

            cards.push(card);

            return card;
        }
    },
    OfferList: {
        owner(parent, args, ctx, info) {
            return users.find(user => {
                return user.id === parent.owner;
            });
        },
        cards(parent, args, ctx, info) {
            return parent.cards.map(id => cards.find(card => card.id === id));
        },
        possibleTraders(parent, args, ctx, info) {
            let possibleTraderIds = [];

            parent.cards.map(offeredCardId => {
                wantLists.find(wants => {
                    if (wants.cards.includes(offeredCardId)) {
                        possibleTraderIds.push(
                            users.find(user => {
                                return user.id === wants.owner;
                            })
                        );
                    }
                });
            });
            return possibleTraderIds;
        }
    },
    WantList: {
        owner(parent, args, ctx, info) {
            return users.find(user => {
                return user.id === parent.owner;
            });
        },
        cards(parent, args, ctx, info) {
            return parent.cards.map(id => cards.find(card => card.id === id));
        },
        possibleTraders(parent, args, ctx, info) {
            let possibleTraderIds = [];

            parent.cards.map(wantedCardId => {
                offerLists.find(offers => {
                    if (offers.cards.includes(wantedCardId)) {
                        possibleTraderIds.push(
                            users.find(user => {
                                return user.id === offers.owner;
                            })
                        );
                    }
                });
            });
            return possibleTraderIds;
        }
    },
    User: {
        offerList(parent, args, ctx, info) {
            return offerLists.find(offerList => {
                return offerList.owner === parent.id;
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
