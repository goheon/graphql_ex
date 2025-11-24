"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { ReactNode, useMemo } from "react";

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const client = useMemo(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: "http://localhost:4000/graphql",
      }),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
