const WantList = {
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
};

export { WantList as default };
