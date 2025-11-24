import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// Server-side Apollo Client for RSC
export const getClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
      fetchOptions: { cache: "no-store" },
    }),
  });
};
