import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';
import SignIn from '~/pages/SignIn';
import HelpOrders from '~/pages/HelpOrders';
import Registrations from '~/pages/Registrations';
import Students from '~/pages/Students';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} isPrivate={false} />
      <Route path="/help-orders" exact component={HelpOrders} />
      <Route path="/registrations" exact component={Registrations} />
      <Route path="/students" exact component={Students} />
      <Redirect to="/" />
    </Switch>
  );
}
