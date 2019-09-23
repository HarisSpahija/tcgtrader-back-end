import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";
import db from './db';

// Resolvers
// parent = contains arguments supplied from parent resolver
// arg = contains arguments supplied from query
// ctx = context for contextual data such as login tokens
// info = information about the operation sent to server
const resolvers = {
  Query: {
    users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users;
      }

      return db.users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    cards(parent, args, { db }, info) {
      if (!args.query) {
        return db.cards;
      }

      return db.cards.filter(card => {
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
      return db.offerLists;
    },
    wantLists() {
      return db.wantLists;
    }
  },
  Mutation: {
    createUser(parent, args, { db }, info) {
      const emailTaken = db.users.some(user => user.email === args.data.email);

      if (emailTaken) {
        throw new Error("Email taken");
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      db.users.push(user);

      return user;
    },
    deleteUser(parent, args, { db }, info) {
      const userIndex = db.users.findIndex(user => user.id === args.id);

      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const deletedUsers = db.users.splice(userIndex, 1);

      offerLists = db.offerLists.filter(offerList => {
        const match = offerList.owner === args.id;
        return !match;
      });

      wantLists = db.wantLists.filter(wantList => {
        const match = wantList.owner === args.id;
        return !match;
      });

      return deletedUsers[0];
    },
    createCard(parent, args, { db }, info) {
      const cardAlreadyExists = db.cards.some(
        card => card.name === args.data.name
      );

      if (cardAlreadyExists) {
        throw new Error("This card already exists");
      }

      const card = {
        id: uuidv4(),
        ...args.data
      };

      db.cards.push(card);

      return card;
    },
    addCardsToWantList(parent, args, { db }, info) {
      const wantListExists = db.wantLists.some(
        wantList => wantList.id === args.data.wantListId
      );

      if (!wantListExists) {
        throw new Error("List doesn't exist");
      }

      return db.wantLists.find(wantList => {
        if (wantList.id === args.data.wantListId) {
          Array.prototype.push.apply(wantList.cards, args.data.cards);
          return wantList;
        }
      });
    },
    removeCardsFromWantList(parent, args, { db }, info) {
      const wantListExists = db.wantLists.some(
        wantList => wantList.id === args.data.wantListId
      );

      if (!wantListExists) {
        throw new Error("List doesn't exist");
      }

      return db.wantLists.find(wantList => {
        if (wantList.id === args.data.wantListId) {
          return (wantList.cards = wantList.cards.filter(id => {
            return !args.data.cards.includes(id);
          }));
        }
      });
    }
  },
  OfferList: {
    owner(parent, args, { db }, info) {
      return db.users.find(user => {
        return user.id === parent.owner;
      });
    },
    cards(parent, args, { db }, info) {
      return parent.cards.map(id => db.cards.find(card => card.id === id));
    },
    possibleTraders(parent, args, { db }, info) {
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
    owner(parent, args, { db }, info) {
      return db.users.find(user => {
        return user.id === parent.owner;
      });
    },
    cards(parent, args, { db }, info) {
      return parent.cards.map(id => db.cards.find(card => card.id === id));
    },
    possibleTraders(parent, args, { db }, info) {
      let possibleTraderIds = [];

      parent.cards.map(wantedCardId => {
        db.offerLists.find(offers => {
          if (offers.cards.includes(wantedCardId)) {
            possibleTraderIds.push(
              db.users.find(user => {
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
    offerList(parent, args, { db }, info) {
      return db.offerLists.find(offerList => {
        return offerList.owner === parent.id;
      });
    },
    wantList(parent, args, { db }, info) {
      return db.wantLists.find(wantList => {
        return wantList.owner === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db
  }
});

server.start(() => {
  console.log("Server is running");
});
