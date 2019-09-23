const Query = {
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
  offerLists(parent, args, { db }, info) {
    return db.offerLists;
  },
  wantLists(parent, args, { db }, info) {
    return db.wantLists;
  }
};

export { Query as default }
