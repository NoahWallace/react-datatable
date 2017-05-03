import * as React from 'react';
import { StatelessComponent } from 'react';

export interface IHeaderState {
	cells: Array<{
		[key: number]: {
			Title: string,
			Options?: any
		}
	}>
}
export class Header extends React.Component<any, any> {
	state = {
		cells: [],
		query: {}
	};

	componentDidMount = () => {
		this.mapRows();
	};
	getOptions = (cell: any) => {
		if ( cell.Options && cell.Options.sortable ) {
			cell.Options.initialSort = cell.Options.initialSort || 0;
			cell.Options.currentSort = cell.Options.initialSort;
		}
		return {
			Title:   cell.Title || '',
			Id:      cell.Id || '',
			Options: cell.Options || {}
		};
	};
	setSort = (cellIdx, rowIdx, cells, reset?:boolean) => {
		let currentState: any = this.state.cells;
		let refObject = cells;
		let direction = reset ? 0 : refObject[ cellIdx ].Options.currentSort === 0 ? 1 : 0;
		for ( let key in refObject ) {
			if ( refObject[ key ].Options )
				refObject[ key ].Options.currentSort = refObject[ key ].Options.initialSort;
		}
		refObject[ cellIdx ].Options.currentSort = direction;
		currentState[ rowIdx ] = refObject;
		this.setState({cells: currentState});
		!reset ? this.props.sort(cellIdx, direction, refObject[ cellIdx ].Id || ''): null;
	};
	mapRows = () => {
		let rows = this.props.headers.map((row) => {
			return this.mapCells(row);
		});
		this.setState({cells: rows});
	};
	mapCells = (row) => {
		let stateObj = {};
		row.map((cell: any, i: number) => {

			switch ( typeof cell ) {
				case 'object':
					stateObj[ i ] = this.getOptions(cell);
					break;
				case 'string':
					stateObj[ i ] = {Title: cell};
					break;
			}

		});
		return stateObj;
	};
	getRows = () => {

		let rows = this.state.cells.map((rowObj, rowIdx) => {

			return <tr className="row" key={`h_row_${rowIdx}`}>
				{this.getCells(rowObj, rowIdx)}
			</tr>;
		});

		return rows

	};
	getCells = (cells, rowIdx) => {
		let header: Array<JSX.Element> = [];
		for ( let key in cells ) {
			let cellIdx=key;
			let search=this.search;
			if ( cells[ key ].Options ) {
				let props = {
					rowIdx,
					cells,
					cellIdx,
					search,
					Title:       cells[ key ].Title,
					currentSort: cells[ key ].Options.currentSort,
					span:        cells[ key ].Options.span,
					setSort:     this.setSort,
					searchable:  cells[key].Options.searchable


				};
				if ( cells[ key ].Options.sortable ) {
					header.push(<SortableHeaderCell {...props} key={`h_cell_${rowIdx}_${cellIdx}`} />);
				}
				else {
					header.push(<StandardHeaderCell {...props} key={`h_cell_${rowIdx}_${cellIdx}`}/>);
				}
			}
			else {
				header.push(<StandardHeaderCell {...cells[key]} key={`h_cell_${rowIdx}_${cellIdx}`} />);
			}
		}
		return header;
	};
	search = (e) => {
		e.preventDefault();
		e.persist();
		if(e.keyCode === 13){
			let query=this.state.query
			for(let key in query){
				let cellIdx= query[key].cellIdx;
				let rowIdx= query[key].rowIdx;
				this.setSort(cellIdx,rowIdx,this.state.cells[rowIdx], true)
			}
			this.props.filter(this.state.query)
		}
		else{
			let v:any={};
			v[e.target.getAttribute("data-id")] = {
				value:e.target.value,
				rowIdx:e.target.getAttribute("data-rowIdx"),
				cellIdx:e.target.getAttribute("data-cellIdx")
			};
			this.setState({query:{...this.state.query,...v}})
		}

	};

	render (): JSX.Element {
		let header = this.getRows();

		return (

			<thead>
			{header}
			</thead>

		);
	}
}
;

let SortableHeaderCell: React.StatelessComponent<any> = (props) => {
	return (
		<th className="cell sortable">
			<div onClick={(e) => props.setSort(props.cellIdx, props.rowIdx, props.cells)}>
				<div className="cell-text">{props.Title}</div>
				<span> {props.currentSort === 0 ? 'a' : 'd'} </span>
			</div>
			{props.searchable &&
				<div>
					<input type="text" placeholder="search"
						   data-id={props.Id || props.Title}
						   data-rowidx={props.rowIdx}
						   data-cellidx={props.cellIdx}
						   onKeyUp={props.search} />
				</div>
			}
		</th>
	);
};

let StandardHeaderCell: React.StatelessComponent<any> = (props) => {
	return (
		<th colSpan={props.span || 1}>
			<div>{props.Title}</div>
			{
				props.searchable &&
				<div>
					<input type="text" placeholder="search"
						   data-id={props.Id || props.Title}
						   data-rowidx={props.rowIdx}
						   data-cellidx={props.cellIdx}
						   onKeyUp={props.search}/>
				</div>
			}
		</th>
	);
};
