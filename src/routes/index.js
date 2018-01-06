import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import isAuthenticated from '../utils/auth';

import PublicLayout from './PublicLayout';
import Home from './Home';
import About from './About';
import View from './View';
import Login from './Login';
import Signup from './Signup';
// import SelectCoin from './SelectCoin';

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
      {/* <PrivateRoute path="/view" exact component={SelectCoin} /> */}
      <PrivateRoute path="/view/:coinName?" component={View} />
      <PublicLayout>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/login" exact component={Login} />
        <Route path="/sign-up" exact component={Signup} />
      </PublicLayout>
    </Switch>
  </Router>
);
