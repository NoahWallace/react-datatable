import * as React from 'react';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import { Container } from '../../Components/CEHTable';
import {Tables} from './Tables'

import '../../CSS/main.scss';
import { Redirect } from 'react-router';



export const Layout = () => {

	return (
		<BrowserRouter>
			<div>
				<header><h1>CEH React Components</h1></header>
				<nav>
					<ul>
					<li><Link to="/home">Home</Link></li>
					<li><Link to="/tables">Tables</Link></li>
					</ul>
				</nav>
				<main>
					<div className="content">
						<Switch>
							<Route exact path="/" component={()=><div> </div>}/>
							<Route path="/tables" component={Tables}/>
						</Switch>
					</div>
				</main>
			</div>
		</BrowserRouter>
	);
};