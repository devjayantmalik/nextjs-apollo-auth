import { withApollo as useApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4100/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

export const withApollo = useApollo(apolloClient);
