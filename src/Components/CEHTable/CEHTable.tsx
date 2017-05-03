import * as React from 'react';
import { ITableFields } from './CEHTable.d';
import { Header } from './Header';
import { Rows } from './Rows';
import { Footer } from './Footer';


import './CEHTable.scss';
export class CEHTable extends React.Component<ITableFields, any> {
	state = {
		rows:             [],
		currentRows:      [],
		currentRowLength: 0,
		rowLength:        0,
		rowsPerPage:      this.props.rpp || 10,
		position:         0
	};
	componentDidMount(){
		let rows=this.props.rows.slice(0, this.props.limit || 100);
		this.setState({
			rows:rows,
			rowLength:rows.length,
			currentRows:rows,
			currentRowLength:rows.length
		})

	}
	sortRows = (i: number, direction: any) => {
		let rows = this.state.currentRows;
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
		this.setState({currentRows: sortRows});
	};
	filterRows = (filterObj) =>{
			let filteredRows= this.state.rows.filter((row)=>{
				let matchArr:Array<boolean>=[];
				for(let key in filterObj){
					let i=filterObj[key].cellIdx;
					let val=filterObj[key].value;
					let reg=new RegExp(val,"i")
					let match= val.trim() ? reg.test(row[i]): true;
					matchArr.push(match)
				}
				return matchArr.indexOf(false) === -1 ;
			})
			this.setState({
				currentRows:filteredRows,
				currentRowLength:filteredRows.length,
				position:0
			})

	}
	setPaging=(v)=>{
		this.setState({rowsPerPage:v})
	}
	setPosition=(v)=>{
		this.setState({position: v})
	}
	render () {

		return (
			<div className="table-container">
				<table>
					<Header
						headers={this.props.headers}
						sort={this.props.sort || this.sortRows}
						filter = {this.props.filter || this.filterRows}
					/>
					<Rows items={this.state.currentRows}
						  rpp={this.state.rowsPerPage}
						  position={this.state.position}
					/>
					<Footer
						setPaging={this.setPaging}
						rpp={this.state.rowsPerPage}
						setPosition={this.setPosition}
						position={this.state.position}
						rowLength={this.state.rowLength}
						currentRowLength={this.state.currentRowLength}
					/>
				</table>
			</div>


		);
	}
}

