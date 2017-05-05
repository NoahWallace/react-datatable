import * as React from 'react';
import { ITableFields } from './ITable';
import { Header } from './Header';
import { Rows } from './Rows';
import { Footer } from './Footer';

import './CEHTable.scss';
export class CEHTable extends React.Component<ITableFields, any> {
	state = {
		normalizedHeaders : [],
		normalizedRows : [],
		rowLength:        0,
		currentRows:      [],
		currentRowLength: 0,
		rowsPerPage:      this.props.rpp || 10,
		position:         0,
		headerRows:       [],
		columnIndex:      {},

	};

	componentDidMount () {
		this.props.rows.slice(0, this.props.limit || 100);
		//let headerRows = this.mapHeaderRows();
		let normalizedHeaders = this.normalizeHeaderRows();
		let normalizedRows = this.normalizeRows(normalizedHeaders);

		this.setState({
			normalizedHeaders,
			normalizedRows,
			currentRows:      normalizedRows,
			currentRowLength: normalizedRows.length,
			rowLength:normalizedRows.length

		});

	}
	normalizeHeaderRows = () =>{
		let searchRow:any = [];
		let rows = this.props.headers.map((row,i) => {
			let cell= this.normalizeHeaderCells(row,i);
			if(cell.length>searchRow.length){
				searchRow= new Array(cell.length);
				cell.map((item)=> {
					if ( item.searchable ) {
						searchRow[ item.cellIdx ] = item
					}
					else {
						searchRow[item.cellIdx] = null
					}
				});

			}
			return cell;
		});

		return [...rows,searchRow];
	}
	normalizeHeaderCells = (row, rowIdx) =>{
		return row.map((cell,i)=>{
			return {
				rowIdx,
				cellIdx:i,
				title: cell.title,
				id:cell.id || "",
				colClass:cell.options && cell.options.colClass ? cell.options.colClass : "",
				headerClass:cell.options && cell.options.headerClass ? cell.options.headerClass : "",
				span: cell.options && cell.options.span ? cell.options.span : 1,
				get searchable(){
					return 	cell.options !== void 0 &&
							cell.options.searchable ===true &&
							this.span ===1
				},
				get sortable(){
					return cell.options !== void 0 &&
						cell.options.sortable ===true &&
						this.span ===1
				},
				sort:-1
			}

		})
	}
	normalizeRows = (headers) => {
		return this.props.rows.map((row,i)=>{

			if(Array.isArray(row)){
				return this.normalizeCells(row,headers,i)
			}
			else{
				let ObjRow = Object.keys(row).map((c) => {
					return [c,row[ c ]];
				});
				return this.normalizeCells(ObjRow,headers,i)
			}
		})
	}
	normalizeCells = (row,headers,rowIdx) =>{
		return row.map((c,i,a)=>{
			let iHeaders;
			let fHeaders = headers
				.find((item,idx)=>item.length === a.length && item[i].id)
				.find((m)=>{
					return m.id === c[0]
			});
			if(!fHeaders){
				iHeaders=headers
					.find((item,idx)=>item.length === a.length && item[i].id)
					.find((m)=>{
						return m.cellIdx===i
					});
			}
			return {
				rowIdx,
				cellIdx:fHeaders ? fHeaders.cellIdx : i,
				text:Array.isArray(c)?c[1] : c,
				searchText:Array.isArray(c)?c[1] : c,
				id: fHeaders ? fHeaders.id : iHeaders.id,
				colClass:fHeaders ? fHeaders.colClass : iHeaders.colClass
			}
		})
	}

	sortRows = (direction: any, id:string) => {
		let rows = this.state.normalizedRows;
		let sortRows = rows.sort((a:any, b:any) => {
			let pprev = a.find((item)=>item.id===id),
				pnext = b.find((item)=>item.id===id),
				prev= isNaN(Number(pprev)) ? pprev.searchText.toUpperCase() : Number(pprev),
				next= isNaN(Number(pprev)) ? pnext.searchText.toUpperCase() : Number(pnext);
			if ( direction === 0 ) {
				return prev < next ? -1 : prev > next ? 1 : 0;
			};
			if ( direction === 1 ) {
				return prev < next ? 1 : prev > next ? -1 : 0;
			};
			return 0;

		});
		this.setState({currentRows: sortRows});
	};
	filterRows = (filterObj) => {
		let filteredRows = this.state.normalizedRows.filter((row) => {

			let matchArr: Array<boolean> = [];
			for(let key in filterObj){
				let current=filterObj[key];
				let target = JSON.parse(current.target);
				let reg=new RegExp(current.value,"i");

				let match = current.value.trim()? reg.test(row[target.cellIdx].searchText):true;
				matchArr.push(match);
			}
			return matchArr.indexOf(false) === -1;
		});
		this.setState({
			currentRows:      filteredRows,
			currentRowLength: filteredRows.length,
			position:         0
		});

	};
	setPaging = (v) => {
		this.setState({rowsPerPage: v});
	};
	setPosition = (v) => {
		this.setState({position: v});
	};

	render () {

		return (
			<div className="table-container">
				<table>
					<Header
						headers={this.state.normalizedHeaders}
						sort={this.props.sort || this.sortRows}
						filter={this.props.filter || this.filterRows}
					/>
					<Rows items={this.state.currentRows}
						  rpp={this.state.rowsPerPage}
						  position={this.state.position}
						  columnIndex={this.state.columnIndex}
						  headers={this.state.headerRows}
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

