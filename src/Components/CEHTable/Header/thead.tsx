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

		query: {}
	};

	setSort = (cellIdx, rowIdx, cells, reset?: boolean) => {
		let currentState: any = this.props.headers;
		let refObject = cells;
		let direction = reset ? 0 : refObject[ cellIdx ].options.currentSort === 0 ? 1 : 0;
		for ( let key in refObject ) {
			if ( refObject[ key ].options )
				refObject[ key ].options.currentSort = refObject[ key ].options.initialSort;
		}
		refObject[ cellIdx ].options.currentSort = direction;
		currentState[ rowIdx ] = refObject;
		this.setState({cells: currentState});
		!reset ? this.props.sort(cellIdx, direction, refObject[ cellIdx ].id || '') : null;
	};

	getRows = () => {

		let rows = this.props.headers.map((rowObj, rowIdx) => {

			return <tr className="row" key={`h_row_${rowIdx}`}>
				{this.getCells(rowObj, rowIdx)}
			</tr>;
		});

		return rows;

	};
	getCells = (cells, rowIdx) => {
		let header: Array<JSX.Element> = [];
		for ( let key in cells ) {
			let cellIdx = key;
			let search = this.search;
			if ( cells[ key ].options ) {
				let props = {
					rowIdx,
					cells,
					cellIdx,
					search,
					options: cells[ key ].options,
					title:   cells[ key ].title,
					setSort: this.setSort

				};
				if ( cells[ key ].options.sortable ) {
					header.push(<SortableHeaderCell {...props} key={`h_cell_${rowIdx}_${cellIdx}`}/>);
				}
				else {
					header.push(<StandardHeaderCell {...props} key={`h_cell_${rowIdx}_${cellIdx}`}/>);
				}
			}
			else {
				header.push(<StandardHeaderCell {...cells[ key ]} key={`h_cell_${rowIdx}_${cellIdx}`}/>);
			}
		}
		return header;
	};
	search = (e) => {
		e.preventDefault();
		e.persist();
		if ( e.keyCode === 13 ) {
			let query = this.state.query;
			for ( let key in query ) {
				let cellIdx = query[ key ].cellIdx;
				let rowIdx = query[ key ].rowIdx;
				this.setSort(cellIdx, rowIdx, this.props.headers[ rowIdx ], true);
			}
			this.props.filter(this.state.query);
		}
		else {
			let v: any = {};
			v[ e.target.getAttribute('data-id') ] = {
				value:   e.target.value,
				rowIdx:  e.target.getAttribute('data-rowIdx'),
				cellIdx: e.target.getAttribute('data-cellIdx')
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
	let {cellIdx, rowIdx, cells, setSort, id, title} = props;
	let {searchable, span, currentSort, hAlign} = props.options;
	return (
		<th className={"cell sortable "+ hAlign}>
			<div onClick={(e) => setSort(cellIdx, rowIdx, cells)}>
				<div className="cell-text">{props.title}</div>
				<span dangerouslySetInnerHTML={{__html:currentSort === 0 ? '&#8964;' : 'd'}}/>
			</div>
			{searchable && !span &&
			<div>
				<input type="text" placeholder="search"
					   data-id={id || title}
					   data-rowidx={rowIdx}
					   data-cellidx={cellIdx}
					   onKeyUp={props.search}/>
			</div>
			}
		</th>
	);
};

let StandardHeaderCell: React.StatelessComponent<any> = (props) => {
	let {cellIdx, rowIdx, id, title} = props;
	let {searchable, span, hAlign} = props.options;
	return (
		<th colSpan={span || 1} className={hAlign}>
			<div>{props.title}</div>
			{
				searchable && !span &&
				<div>
					<input type="text" placeholder="search"
						   data-id={id || title}
						   data-rowidx={rowIdx}
						   data-cellidx={cellIdx}
						   onKeyUp={props.search}/>
				</div>
			}
		</th>
	);
};
