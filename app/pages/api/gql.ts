import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { createContext } from "../../graphql/context";
import Cors from "micro-cors";

const cors = Cors();
const apolloServer = new ApolloServer({
  schema,
  resolvers,
  context: createContext,
});
const startServer = apolloServer.start();

export default cors(async function handler(req: MicroRequest, res: any) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: "/api/gql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
