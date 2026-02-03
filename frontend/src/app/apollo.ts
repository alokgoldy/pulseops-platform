// Apollo Client setup for GraphQL requests
// Reads endpoint from VITE_GRAPHQL_URI; defaults to http://localhost:4000/graphql
// Exports a configured ApolloClient instance with HttpLink and InMemoryCache
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:4000/graphql',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
