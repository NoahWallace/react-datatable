import * as React from 'react';

export interface IHeaderState {
	cells: {
		[key: number]: {
			Title: string,
			Options?: any }
	}
}
export class Header extends React.Component<any, IHeaderState> {
	state = {
		cells: {}
	};

	componentDidMount = () => {
		this.mapCells();
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
	setSort = (i) => {
		let refObject = this.state.cells;
		let direction = refObject[i].Options.currentSort === 0 ? 1 : 0;
		for(let key in refObject){
			if(refObject[key].Options )
			refObject[key].Options.currentSort = refObject[key].Options.initialSort
		}
		refObject[i].Options.currentSort= direction;
		this.setState({cells:refObject});
		this.props.sort(i,direction,refObject[i].Id || "")
	};
	mapCells = () => {
		let stateObj = {};
		this.props.items.map((cell: any, i: number) => {

			switch ( typeof cell ) {
				case 'object':
					stateObj[ i ] = this.getOptions(cell);
					break;
				case 'string':
					stateObj[ i ] = {Title: cell};
					break;
			}
			this.setState({cells: stateObj});
		});
	};
	getCells = () => {
		let header: Array<JSX.Element> = [];
		let cells = this.state.cells;
		for ( let key in cells ) {
			if ( cells[ key ].Options && cells[ key ].Options.sortable ) {
				header.push(
					<div className="cell sortable" key={key} onClick={(e) => this.setSort(key)}>
						<div className="cell-text">{cells[ key ].Title}</div>
						<span> {this.state.cells[key].Options.currentSort === 0 ? "a":"d"} </span>
					</div>
				);
			}
			else {
				header.push(<div className="cell" key={key}>{cells[ key ].Title}</div>);
			}
		}
		return header;
	};
	Search=(e)=>{
		e.preventDefault();
		e.persist();
		console.log(e.keyCode)

	}
	render (): JSX.Element {
		let header = this.getCells();

		return (

			<div className="table-head">

				<div className="row">
				{header}
				</div>
			</div>
		);
	}
}
;

