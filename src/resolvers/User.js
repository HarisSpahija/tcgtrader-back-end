const User = {
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
};

export { User as default };
