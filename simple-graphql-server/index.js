import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./data/schema";
import resolvers from "./data/resolvers";

const app = express();

app.get("/", (request, response) => {
  response.send("GraphQL is working.");
});

const root = resolvers;

app.use(
  "/server",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

const PORT = 4545;
app.listen(4545, () =>
  console.log(`Running server on port localhost:${PORT}/server...`)
);
