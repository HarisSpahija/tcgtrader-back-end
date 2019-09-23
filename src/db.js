let users = [
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

let offerLists = [
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

let wantLists = [
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

let cards = [
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

const db = {
      users,
      offerLists,
      wantLists,
      cards
}

export { db as default }