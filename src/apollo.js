import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import constants from './utils/constants';

const httpLink = createHttpLink({ uri: `${constants.SERVER_IP}/graphql` });

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token')
  }
}));

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const { response: { headers } } = operation.getContext();
    if (headers) {
      const token = headers.get('x-token');

      if (token) {
        localStorage.setItem('token', token);
      }
    }

    return response;
  }));

const httpLinkMiddleware = afterwareLink.concat(middlewareLink.concat(httpLink));

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8080/subscriptions',
  options: {
    reconnect: true,
    connectionParams: {
      token: localStorage.getItem('token')
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkMiddleware
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});
