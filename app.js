const express = require("express");
const graphql = require("graphql");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");


const app = express();

const schema = new GraphQLSchema({
  query,
  mutation
});

app.use(
  "/graphql",
  expressGraphQl({
    schema: schema,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("App listening on port 3000!");

  console.log("GraphiQL is running on http://localhost:3000/graphql");
});


