const OfferList = {
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
};

export { OfferList as default };
