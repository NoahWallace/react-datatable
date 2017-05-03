import * as React from 'react';
import { Link, Route, BrowserRouter } from 'react-router-dom';
import { CEHTable } from '../../Components/CEHTable';

let ABC:React.StatelessComponent<any> = () =>(<div>this is a React Component</div>)
let mockData = {
	headers: [
		[
			{Title:"Group1",Options:{span:2}},
			{Title:"Group2",Options:{span:2, searchable:true}},
		],[
		'test1',
		'test2',
			{
				Title:"Test3",
				Id:"test3",
				Options:{
					searchable:true
				}
			},
		{
			Title:   'testSortable',
			Id:      'testSortable',
			Options: {
				sortable: true,
				searchable:true,
				colAlign:"right",
				headerAlign:"right",

			}
		},

	]],
	rows:    [
		[ 'col1.1', 'col1.2', 'col1.3', 'a' ],
		[ 'col2.1', 'col2.2', 'col2.3', 'b' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'c' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'd' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'e' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'f' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'g' ],
		[ 'col3.1', 'col3.2', 'col3.3',  <ABC/>   ],
		[ 'col3.1', 'col3.2', 'col3.3', 'i' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'j' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'k' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'l' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'm' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'n' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'o' ],
		[ 'col3.1', 'col3.2', 'col3.3', 'p' ],
	],
	options:{}
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