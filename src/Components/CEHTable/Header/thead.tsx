import * as React from 'react';
import { INormalizedHeaderItem } from '../ITable';
import { SearchHeaderCell, StandardHeaderCell, SortableHeaderCell } from './Cells';

export interface IHeaderState {
	query: IQueryObj;
	headerState: {
		[key: string]: INormalizedHeaderItem;
	}
}
export interface IHeaderProps {
	headers: INormalizedHeaderItem[][];
}
export interface IQueryObj {
	[id: string]: {
		value?: string | number;
		target: string;
	}
}
export interface ISearchTarget {
	cellIdx: number;
	rowIdx: number;
	id: string;
}
export class Header extends React.Component<any, IHeaderState> {
	state = {
		query:       {},
		headerState: {}
	};

	componentWillReceiveProps (nextProps) {
		let headerState = {};
		nextProps.headers.map((r, ri) => {
			return r.map((c, ci) => {
				headerState[ `${ri}_${ci}` ] = c;
				return;
			});
		});
		this.setState({headerState});
	}

	getRows = (): JSX.Element[] => {

		return this.props.headers.map((o, rowIdx, a) => {
			let lastRow = rowIdx === a.length - 1;
			return o.every((c) => c === null) ? null :
				<tr key={`h_row_${rowIdx}`}>{this.getCells(o, rowIdx, lastRow)}</tr>;
		});
	};
	getCells = (cells: INormalizedHeaderItem[], rowIdx: number, lastRow: boolean): JSX.Element[] => {
		return cells.map((c, i) => {

			if ( c === null ) {
				return <th key={`h_searchcell_${i}`}></th>;
			}
			if ( lastRow && c.searchable ) {
				return <SearchHeaderCell key={`h_searchcell_${i}`}
										 id={c.id}
										 rowIdx={c.rowIdx}
										 cellIdx={c.cellIdx}
										 headerClass={c.headerClass}
										 search={this.search}
				/>;
			}
			if ( c.sortable ) {
				return <SortableHeaderCell setSort={this.setSort}
										   rowIdx={c.rowIdx}
										   cellIdx={c.cellIdx}
										   id={c.id}
										   headerClass={c.headerClass}
										   title={c.title}
										   sort={this.state.headerState[ `${rowIdx}_${i}` ].sort}
										   key={`h_cell_${c.rowIdx}_${c.cellIdx}`}/>;
			}

			return <StandardHeaderCell key={`h_cell_${c.rowIdx}_${c.cellIdx}`}
									   title={c.title}
									   headerClass={c.headerClass}
									   span={c.span}
			/>;

		});
	};
	setSort = (cellIdx: number, rowIdx: number, id: string, reset?: boolean): void => {
		let currentState      = this.state.headerState,
			itemState: number = currentState[ `${rowIdx}_${cellIdx}` ].sort,
			direction: number = reset ? 0 : itemState === -1 ? 0 : itemState === 0 ? 1 : 0;

		for ( let key in currentState ) {
			if ( currentState[ key ] !== null && currentState[ key ].sort !== -1 ) {
				currentState[ key ].sort = -1;
			}
		}

		if ( !reset ) {
			currentState[ `${rowIdx}_${cellIdx}` ].sort = direction;
			this.props.sort(direction, currentState[ `${rowIdx}_${cellIdx}` ].id);
		}
		this.setState({headerState: currentState});

	};
	initSearch = (): void => {
		let query: IQueryObj = this.state.query;
		for ( let key in query ) {
			let target: ISearchTarget = JSON.parse(query[ key ].target),
				cellIdx: number       = target.cellIdx,
				rowIdx: number        = target.rowIdx;
			this.setSort(cellIdx, rowIdx, target.id, true);
		}
		this.props.filter(this.state.query);
	};
	search = (e) => {
		e.preventDefault();
		e.persist();
		if ( e.keyCode === 13 ) {
			this.initSearch();
		}
		else {
			let v: IQueryObj = {
				[ e.currentTarget.getAttribute('data-id') ]: {
					value:  e.type === 'click' ? '' : e.currentTarget.value,
					target: e.currentTarget.getAttribute('data-target')
				}
			};
			this.setState(
				{query: {...this.state.query, ...v}},
				e.type === 'click' ? this.initSearch : () => {});
		}
	};

	render (): JSX.Element {
		let header: JSX.Element[] = this.getRows();

		return (
			<thead>
			{header}
			</thead>
		);
	}
}
;






