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
};

export { Mutation as default }