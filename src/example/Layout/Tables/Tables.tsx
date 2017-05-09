import * as React from 'react';
import {Link, Route} from 'react-router-dom';
import {
	SimpleTable,
	SimpleGroupedTable,
	SimpleGroupedMultiTable,
	SearchTable,
	SortTable,
	SortWithGroupTable,
	SortWithSearchTable,
	HttpSimpleTable,
	HttpPagingTable,
	HttpSimpleTableWithContainer,
	WaitingTable
} from '../Tables/TableViews';
export const Tables: React.StatelessComponent<any> = ({match}) => {

	return (
		<div>
			<div className="page-nav">
			<ul>

				<li><h3>Container</h3>
					<ul>
						<li><Link to={`${match.url}/container`}>Container</Link></li>
					</ul>
				</li>
				<li><h3>CEH Tables</h3>
					<ul>
						<li><Link to={`${match.url}/simple`}>Simple</Link></li>
						<li><Link to={`${match.url}/simplewithgroup`}>WithGroup</Link></li>
						<li><Link to={`${match.url}/simplewithgroups`}>WithGroups</Link></li>
						<li><Link to={`${match.url}/search`}>simplesearch</Link></li>
						<li><Link to={`${match.url}/sort`}>sort</Link></li>
						<li><Link to={`${match.url}/sortwithgroup`}>sortwithgroup</Link></li>
						<li><Link to={`${match.url}/sortwithsearch`}>sortwithsearch</Link></li>
						<li><Link to={`${match.url}/waiting`}>waiting</Link></li>
					</ul>
				</li>
				<li><h3>Http Tables</h3>
					<ul>
						<li><Link to={`${match.url}/httpsimple`}>Simple</Link></li>
						<li><Link to={`${match.url}/httppaging`}>Paging</Link></li>

					</ul>
				</li>
			</ul>
			</div>
			<div >
				<Route path={`${match.url}/container`} component={HttpSimpleTableWithContainer}/>
				<Route path={`${match.url}/simple`} component={SimpleTable}/>
				<Route path={`${match.url}/simplewithgroup`} component={SimpleGroupedTable}/>
				<Route path={`${match.url}/simplewithgroups`} component={SimpleGroupedMultiTable}/>
				<Route path={`${match.url}/search`} component={SearchTable}/>
				<Route path={`${match.url}/sort`} component={SortTable}/>
				<Route path={`${match.url}/sortwithgroup`} component={SortWithGroupTable}/>
				<Route path={`${match.url}/sortwithsearch`} component={SortWithSearchTable}/>
				<Route path={`${match.url}/httpsimple`} component={HttpSimpleTable}/>
				<Route path={`${match.url}/waiting`} component={WaitingTable}/>
			</div>

		</div>
	)
}