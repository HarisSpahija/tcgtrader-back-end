const Subscription = {
  wantList: {
    subscribe(parent, { userId }, { db, pubsub }, info) {
      const user = db.users.find((user) => user.id === userId)

      if (!user) {
        throw new Error('User is not found')
      }

      const hasWantList = db.wantLists.find((wantList) => wantList.id === user.id)

      if (!hasWantList) {
        throw new Error('User does not have a wantList')
      }

      return pubsub.asyncIterator(`wantList ${userId}`) // if userId = 1, channel is wantList 1
    }
  },
  // TODO: Create offerList subscription
  // offerList: {
    // subscribe(parent, { userId }, { db, pubsub }, info) {
    //   const user = db.users.find((user) => user.id === userId)

    //   if (!user) {
    //     throw new Error('User is not found')
    //   }

    //   const hasOfferList = db.offerLists.find((offerList) => offerList.id === user.id)

    //   if (!hasOfferList) {
    //     throw new Error('User does not have a offerList')
    //   }

    //   return pubsub.asyncIterator(`offerList ${userId}`) // if userId = 1, channel is offerList 1
    // }
  // }
  card: {
    subscribe(parent, { cardId }, { db, pubsub }, info) {
      const card = db.cards.find((card) => card.id === cardId)

      if (!card) {
        throw new Error('Card is not found')
      }

      return pubsub.asyncIterator(`card ${cardId}`) // if cardId = 1, channel is card 1
    }
  }
};

export { Subscription as default };
