import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';

import constants from './utils/constants';

const httpLink = createHttpLink({ uri: `${constants.SERVER_IP}/graphql` });

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token')
  }
}));

const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();
  if (headers) {
    const token = headers.get('x-token');

    if (token) {
      localStorage.setItem('token', token);
    }
  }

  return forward(operation);
});

const link = afterwareLink.concat(middlewareLink.concat(httpLink));

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});
