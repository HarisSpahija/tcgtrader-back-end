const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema
} = graphql;

//Schema defines data on the Graph like object types(card name), relation between 
//these object types and descibes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data  

var fakeCardDatabase = [
    { name:"Lesser Masticore", cmc:2, id:1},
    { name: "Ranging Raptors", cmc:3, id: 2},
    { name: "Infuse with the Elements", cmc:4, id: 3}
]

const CardType = new GraphQLObjectType({
    name: 'Card',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        cmc: { type: GraphQLInt }
    })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all cards, get all colors, get a particular cmc 
//or get a particular card.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        card: {
            type: CardType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument by the user
                return fakeCardDatabase.find((item) => { return item.id == args.id});
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery
});