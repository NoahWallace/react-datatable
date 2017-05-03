import * as React from 'react';
import { ITableFields } from './CEHTable.d';
import { Header } from './Header';
import { Rows } from './Rows';
import { Footer } from './Footer';

import './CEHTable.scss';
export class CEHTable extends React.Component<ITableFields, any> {
	state = {
		rows:        [],
		rowLength: 0,
		rowsPerPage: this.props.rpp || 10,
		clientPosition:    0

	};
	componentDidMount(){
		let rows=this.props.rows.slice(0, this.props.limit || 100);
		this.setState({
			rows:rows,
			rowLength:rows.length
		})

	}
	sortRows = (i: number, direction: any) => {
		let rows = this.state.rows;
		let sortRows = rows.sort((a, b) => {
			let prev = typeof a[ i ] === 'string' ? (a[ i ] as string).toUpperCase() : a[ i ];
			let next = typeof b[ i ] === 'string' ? (b[ i ] as string).toUpperCase() : b[ i ];
			if ( direction === 0 ) {
				return prev < next ? -1 : prev > next ? 1 : 0;
			}
			;
			if ( direction === 1 ) {
				return prev < next ? 1 : prev > next ? -1 : 0;
			}
			;
			return 0;

		});
		this.setState({rows: sortRows});
	};
	setPaging=(v)=>{
		this.setState({rowsPerPage:v})
	}
	setPosition=(v)=>{
		this.setState({clientPosition:v})
	}
	render () {

		return (
			<div className="table-container">
				<div className="table">
					<Header
						items={this.props.headers}
						sort={this.props.sort || this.sortRows}
					/>
					<Rows items={this.state.rows}
						  rpp={this.state.rowsPerPage}
						  position={this.state.clientPosition}
					/>
					<Footer
						setPaging={this.setPaging}
						rpp={this.state.rowsPerPage}
						setPosition={this.setPosition}
						position={this.state.clientPosition}
						rowLength={this.state.rowLength}
					/>
				</div>
			</div>


		);
	}
}

