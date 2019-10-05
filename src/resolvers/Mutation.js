import uuidv4 from "uuid/v4";

const Mutation = {
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
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find(user => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    // User name
    if (typeof data.name === "string") {
      const userAlreadyExists = db.users.some(user => user.name === data.name);

      if (userAlreadyExists) {
        throw new Error("User name already exists");
      }

      user.name = data.name;
    }

    // User email
    if (typeof data.email === "string") {
      const emailAlreadyExists = db.users.some(user => user.email === data.email);

      if (emailAlreadyExists) {
        throw new Error("Email already exists");
      }

      user.email = data.email;
    }

    // Age
    if (typeof data.age === "number") {
      user.age = data.age;
    }

    return user
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
  updateCard(parent, args, { db }, info) {
    const { id, data } = args;
    const card = db.cards.find(card => card.id === id);

    if (!card) {
      throw new Error("Card not found");
    }

    // Card Name
    if (typeof data.name === "string") {
      const cardAlreadyExists = db.cards.some(card => card.name === data.name);

      if (cardAlreadyExists) {
        throw new Error("Card name already exists");
      }

      card.name = data.name;
    }

    // Type
    if (typeof data.type === "string") {
      card.type = data.type;
    }

    // Card Text
    if (typeof data.cardText !== "undefined") {
      card.cardText = data.cardText;
    }

    // Flavour Text
    if (typeof data.flavourText !== "undefined") {
      card.flavourText = data.flavourText;
    }

    // Standard Legal
    if (typeof data.standardLegal !== "undefined") {
      card.standardLegal = data.standardLegal;
    }

    // Price
    if (typeof data.price !== "undefined") {
      card.price = data.price;
    }

    return card
  },
  // TODO: delete card
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
  },
  // TODO: add card to offer list
  // TODO: remove cards from offer list
};

export { Mutation as default };
