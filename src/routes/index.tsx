import React from 'react';
import { Switch } from 'react-router-dom';
import { Login } from '../pages/login';
import { ProductsPage } from '../pages/products';
import { UploadsPage } from '../pages/uploads';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" exact component={Login} isGuest />
    <Route path="/" exact component={ProductsPage} isPrivate />
    <Route path="/uploads" exact component={UploadsPage} isPrivate />
  </Switch>
);

export default Routes;
