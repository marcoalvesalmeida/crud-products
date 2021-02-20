import React from 'react';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '../pages/SignIn';
import SingUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';

export default function Routes() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={SingIn} />
				<Route path="/register" component={SingUp} />

				<Route path="/dashboard" component={Dashboard} isPrivate />
			</Switch>
		</Router>
	);
}
