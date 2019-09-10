const express = require("express");
const graphqlHTPP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTPP({
    schema,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("App listening on port 3000!");

  console.log("GraphiQL is running on http://localhost:3000/graphql")
});
