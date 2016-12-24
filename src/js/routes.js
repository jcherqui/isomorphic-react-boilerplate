import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Test from './components/Test';
import Welcome from './components/Welcome';

const Routes = (
    <Route>
        <Route path="/" component={App} />
        <Route path="/welcome" component={Welcome} />
        <Route path="*" components={Test} />
    </Route>
);

export default Routes;
