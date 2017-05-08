import * as React from 'react';
import { Link, Route, BrowserRouter } from 'react-router-dom';
import { CEHTable } from '../../Components/CEHTable';
import {
	SimpleTable,
	SimpleGroupedTable,
	SimpleGroupedMultiTable,
	SearchTable,
	SortTable,
	SortWithGroupTable,
	SortWithSearchTable,
	HttpSimpleTable,
	HttpPagingTable
} from './TableViews';


export const Layout = () => {
	return (
		<BrowserRouter>
			<div>
				<header>Somecontent</header>
				<nav>
					<ul>
						<li><Link to="/home">Home</Link></li>
						<li><h3>CEH Tables</h3>
							<ul>
								<li><Link to="/simple">Simple</Link></li>
								<li><Link to="/simplewithgroup">WithGroup</Link></li>
								<li><Link to="/simplewithgroups">WithGroups</Link></li>
								<li><Link to="/search">simplesearch</Link></li>
								<li><Link to="/sort">sort</Link></li>
								<li><Link to="/sortwithgroup">sortwithgroup</Link></li>
								<li><Link to="/sortwithsearch">sortwithsearch</Link></li>
							</ul>
						</li>
						<li><h3>Http Tables</h3>
							<ul>
								<li><Link to="/httpsimple">Simple</Link></li>
								<li><Link to="/httppaging">Paging</Link></li>

							</ul>
						</li>
					</ul>
				</nav>
				<main>
					<div className="content">
						<Route path="/simple" component={SimpleTable}/>
						<Route path="/simplewithgroup" component={SimpleGroupedTable}/>
						<Route path="/simplewithgroups" component={SimpleGroupedMultiTable}/>
						<Route path="/search" component={SearchTable}/>
						<Route path="/sort" component={SortTable}/>
						<Route path="/sortwithgroup" component={SortWithGroupTable}/>
						<Route path="/sortwithsearch" component={SortWithSearchTable}/>
						<Route path="/httpsimple" component={HttpSimpleTable}/>
						<Route path="/httppaging" component={HttpPagingTable}/>
					</div>
				</main>

			</div>
		</BrowserRouter>
	);
};