import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';
import SignIn from '~/pages/SignIn';
import HelpOrders from '~/pages/HelpOrders';
import Registrations from '~/pages/Registrations';
import Students from '~/pages/Students';
import Plans from '~/pages/Plans';
import StudentForm from '~/pages/StudentForm';
import PlanForm from '~/pages/PlanForm';
import RegistrationForm from '~/pages/RegistrationForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} isPrivate={false} />
      <Route path="/help-orders" exact component={HelpOrders} />
      <Route path="/plans" exact component={Plans} />
      <Route path="/registrations" exact component={Registrations} />
      <Route path="/students" exact component={Students} />
      <Route path="/students-form" exact component={StudentForm} />
      <Route path="/plans-form" exact component={PlanForm} />
      <Route path="/registrations-form" exact component={RegistrationForm} />
      <Redirect to="/" />
    </Switch>
  );
}
