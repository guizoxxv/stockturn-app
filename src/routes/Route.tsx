import React, { useContext } from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { AuthContext } from '../context/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { authData } = useContext(AuthContext);

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === Boolean(authData.email) ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/login' : '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
