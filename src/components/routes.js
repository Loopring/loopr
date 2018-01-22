import React from 'react';
import { Route, Switch } from 'dva/router';
import Pages from './pages';
import ordersRoutes from './orders/routes';
import ringsRoutes from './rings/routes';
export default (
	<div>
		<div>
			<Switch>
				<Route path="/" exact component={Pages.Wallet} />
				<Route path="/wallet" exact component={Pages.Wallet} />
				<Route path="/market" exact component={Pages.Market} />
			</Switch>
			{ringsRoutes}
			{ordersRoutes}
		</div>
	</div>
		
)
