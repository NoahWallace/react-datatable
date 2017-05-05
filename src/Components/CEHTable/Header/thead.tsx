import * as React from 'react';
import { StatelessComponent } from 'react';

export interface IHeaderState {
	cells: Array<{
		[key: number]: {
			title: string,
			options?: any
		}
	}>
}
export class Header extends React.Component<any, any> {
	state = {
		query: {},
		headerState:{}
	};
	componentWillReceiveProps(nextProps){

		let headerState = {};
		nextProps.headers.map((r, ri) => {
			return r.map((c, ci) => {
				headerState[ `${ri}_${ci}` ] = c;
				return;
			});
		});

		this.setState({headerState});
	}
	getRows = () => {

		let rows = this.props.headers.map((o, rowIdx, a) => {
			let lastRow = rowIdx === a.length - 1;
			return <tr className="row" key={`h_row_${rowIdx}`}>
				{this.getCells(o, rowIdx, lastRow)}
			</tr>;
		});

		return rows;

	};
	getCells = (cells, rowIdx, lastRow) => {
		return cells.map((c, i) => {

			if ( lastRow && c === null ) {
				return <th key={`h_searchcell_${i}`}> </th>;
			}
			if ( lastRow && c.searchable ) {
				return <SearchHeaderCell {...c} key={`h_searchcell_${i}`} search={this.search}/>;
			}
			if ( c.sortable ) {
				return <SortableHeaderCell {...c}  setSort={this.setSort} sort={this.state.headerState[`${rowIdx}_${i}`].sort} key={`h_cell_${c.rowIdx}_${c.cellIdx}`}/>;
			}
			else {
				return <StandardHeaderCell {...c} key={`h_cell_${c.rowIdx}_${c.cellIdx}`}/>;
			}
		});
	};
	setSort = (cellIdx, rowIdx, id, reset?: boolean) => {
		let currentState=this.state.headerState;
		let itemState = currentState[`${rowIdx}_${cellIdx}`].sort;
		for (let key in currentState){
			if(currentState[key] !== null && currentState[key].sort !== -1 ) {
				currentState[ key ].sort = -1;
			}
		}
		let direction = reset ? 0 : itemState === -1 ? 0 : itemState === 0 ? 1 : 0;
		!reset ? currentState[`${rowIdx}_${cellIdx}`].sort =direction: "";
		this.setState({headerState:currentState});
		!reset ? this.props.sort(direction, currentState[`${rowIdx}_${cellIdx}`].id || '') : null;
	};
	search = (e) => {
		e.preventDefault();
		e.persist();
		if ( e.keyCode === 13 ) {
			let query = this.state.query;
			for ( let key in query ) {
				let target = JSON.parse(query[ key ].target);
				let cellIdx = target.cellIdx;
				let rowIdx = target.rowIdx;
				this.setSort(cellIdx, rowIdx, target.id, true);
			}
			this.props.filter(this.state.query);
		}
		else {
			let v: any = {};

			v[ e.target.getAttribute('data-id') ] = {
				value:   e.target.value,
				target:  e.target.getAttribute('data-target')
			};

			this.setState({query: {...this.state.query, ...v}});
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
	let {cellIdx, rowIdx, setSort, id, title, sort, headerClass} = props;
	return (
		<th className={'sortable ' + headerClass}>
			<div onClick={(e) => setSort(cellIdx, rowIdx, id)}>
				<div className="cell-text">{title}</div>
				<span dangerouslySetInnerHTML={{__html: sort === -1 ? 'u' : sort === 0 ? 'a' : 'd'}}/>
			</div>
		</th>
	);
};

let StandardHeaderCell: React.StatelessComponent<any> = (props) => {
	let {cellIdx, rowIdx, id, title, searchable, span, headerClass} = props;

	return (
		<th colSpan={span} className={headerClass}>
			<div>{title}</div>
		</th>
	);
};

let SearchHeaderCell: React.StatelessComponent<any> = (props) => {
	let {id,search} = props;

	return (
		<th>
			<div>
				<input type="text" placeholder="search"
					   data-id={id}
					   data-target={JSON.stringify(props)}
					   onKeyUp={search}/>
			</div>
		</th>
	);
};
