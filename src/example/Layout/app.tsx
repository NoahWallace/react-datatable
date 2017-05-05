import * as React from 'react';
import { Link, Route, BrowserRouter } from 'react-router-dom';
import { CEHTable } from '../../Components/CEHTable';

let ABC: React.StatelessComponent<any> = () => (<div>this is a React Component</div>);
let mockData = {
	headers: [
		[
			{title: 'Group1', options: {span: 2}},
			{title: 'Group2', options: {span: 2, searchable: true}}
		],
		[
			{title: 'test0',id:'idtest0'},
			{
				title:   'test1',
				id:      'idtest1',
				options: {
					headerClass: 'left',
					colClass:     'left',
					sortable: true,
				}
			},
			{
				title:   'testSortable',
				id:      'idtest3',
				options: {
					sortable:   true,
					searchable: true,
					colClass:     'right',
					headerClass:     'right',

				}
			},
			{
				title:   'Test2',
				id:      'idtest2',
				options: {
					searchable: true,
					colClass:     'center',
					headerClass:     'center'
				}
			},

		]
	],
	rows:    [
		[ 'col1.1', 'col1.2', 'col1.3', 'a' ],
		{idtest0: 'test0', idtest1: 'test1', idtest2: 'test2', idtest3: 'test3'},
		[ 'col3.1', 'col3.2', 'col3.3', 'c' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'd' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'e' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'f' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'g' ],
		[ 'col3.1', 'col3.2', 'col3.3', <ABC/> ],
		[ 'col3.1', 'col3.2', 'col3.3', 'i' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'j' ],
		[ 'col3.1', 'col3.2', 'a', 'k' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'l' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'm' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'n' ],
		[ 'col3.1', 'col3.2', 'z', 'o' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'p' ],
	],
	options: {}
};

export const Layout = () => {
	return (
		<BrowserRouter>
			<div>
				<header>Somecontent</header>
				<nav>
					<ul>
						<li><Link to="/home">Home</Link></li>
						<li><Link to="/tables">CEH Table</Link></li>
					</ul>
				</nav>
				<main>
					<div className="content">
						<Route path="/tables" component={Temp}/>
					</div>
				</main>

			</div>
		</BrowserRouter>
	);
};

export const Temp = () => {
	let sort = (i, direction, key) => {
		console.log(i, direction, key);
	};
	return (
		<div>
			<CEHTable
				headers={mockData.headers}
				rows={mockData.rows}
			/>
		</div>
	);
};