import React from 'react';
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { deleteToken } from '../utils/auth';

class Logout extends React.Component {
  componentDidMount() {
    deleteToken();
    this.props.client.resetStore();
    this.props.history.push('/login');
  }

  render() {
    return <h1 className="loading-text">Logging out...</h1>;
  }
}

export default withApollo(Logout);
