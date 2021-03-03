import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/login';
import Home from '../pages/home';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" exact component={Login} />
    <Route path="/" exact component={Home} isPrivate />
  </Switch>
);

export default Routes;
