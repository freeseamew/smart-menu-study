import { ApolloClient, InMemoryCache, split } from '@apollo/client/core';
import { HttpLink, ApolloLink, from } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:3000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  return forward(operation);
});

const link = split(
  ({query}) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  // uri: 'http://localhost:3000/graphql',
  link: from ([authLink, link]),
  cache: new InMemoryCache(),
});

export default client;