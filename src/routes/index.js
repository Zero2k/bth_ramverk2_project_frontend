import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../utils/auth';

import PublicLayout from './PublicLayout';
import Home from './Home';
import About from './About';
import View from './View';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      ))
    }
  />
);

export default () => (
  <Router>
    <Switch>
      <PrivateRoute path="/view/:coinName?" component={View} />
      <PrivateRoute path="/logout" exact component={Logout} />
      <PublicLayout>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/login" exact component={Login} />
        <Route path="/sign-up" exact component={Signup} />
      </PublicLayout>
    </Switch>
  </Router>
);
