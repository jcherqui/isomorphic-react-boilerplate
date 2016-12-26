import React from 'react';
import { Route, Redirect } from 'react-router';
import Users from './components/Users';
import NotFound from './components/NotFound';
import Welcome from './components/Welcome';

const Routes = (
    <Route>
        <Route path="/" component={Welcome} />
        <Route path="/users" component={Users} />
        <Route path="/404" components={NotFound} />
        <Redirect from="*" to="/404" />
    </Route>
);

export default Routes;
