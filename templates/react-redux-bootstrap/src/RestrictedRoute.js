import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RestrictedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
            rest.allow
                ? <Component {...props} />
                : <Redirect to={rest.fallback} />
        )}
    />
);

export default RestrictedRoute;
