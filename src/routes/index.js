import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PublicLayout from './PublicLayout';
import Home from './Home';
import About from './About';
import Auth from './Auth';
import Login from './Login';
import Signup from './Signup';

export default () => (
  <Router>
    <Switch>
      <PublicLayout>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/me" exact component={Auth} />
      </PublicLayout>
    </Switch>
  </Router>
);
