import React from 'react';
import { deleteToken } from '../utils/auth';

class Logout extends React.Component {
  componentDidMount() {
    deleteToken();
    this.props.history.push('/login');
  }

  render() {
    return <h1 className="loading-text">Logging out...</h1>;
  }
}

export default Logout;
