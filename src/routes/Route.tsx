import React, { useContext } from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { AuthContext } from '../context/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isGuest?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isGuest = false,
  component: Component,
  ...rest
}) => {
  const { logged } = useContext(AuthContext);

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (isGuest && logged) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          );
        }

        if (isPrivate && !logged) {
          return (
            <Redirect
              to={{
                pathname: 'login',
                state: { from: location },
              }}
            />
          );
        }

        return <Component />;
      }}
    />
  );
};

export default Route;
