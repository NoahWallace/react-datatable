import * as React from 'react';
import {
	INormalizedHeaderItem, INormalizedRowItem, ITableProps, ITableState, ITableTypes, IHeaderOptions,
	IRowTypes
} from './ITable';
import { Header } from './Header';
import { Rows } from './Rows';
import { Footer } from './Footer';

import './CEHTable.scss';
import { isUndefined } from 'util';
export class CEHTable extends React.Component<ITableProps, ITableState> {
	state: ITableState = {
		normalizedHeaders: [],
		normalizedRows:    [],
		rowLength:         0,
		colLength:         0,
		currentRows:       [],
		currentRowLength:  0,
		rowsPerPage:       {
			value:   10,
			options: [ 5,10, 25, 50, 100 ]
		},
		rowPosition:       0
	};

	componentDidMount () {

		this.props.rows.slice(0, this.props.limit || 100);

		let normalizedHeaders: Array<Array<INormalizedHeaderItem>> = this.normalizeHeaderRows();
		let normalizedRows: Array<Array<INormalizedRowItem>> = this.normalizeRows(normalizedHeaders);
		let colLength = normalizedHeaders.reduce(function (a, i, ii) {
			return ii === 1 ? a : i.length > a.length ? i : a;
		});

		this.setState({
			normalizedHeaders,
			normalizedRows,
			currentRows:      normalizedRows,
			currentRowLength: normalizedRows.length,
			rowLength:        this.props.totalRecordCount || normalizedRows.length,
			rowsPerPage:      this.props.rowsPerPage || this.state.rowsPerPage,
			rowPosition:      this.props.rowPosition || 0,
			colLength:        colLength.length,
		});

	}

	normalizeHeaderRows = (): Array<Array<INormalizedHeaderItem>> => {
		let searchRow: any = [];
		let rows = this.props.headers.map((row, i) => {
			let cell = this.normalizeHeaderCells(row, i);
			if ( cell.length > searchRow.length ) {
				searchRow = new Array(cell.length);
				cell.map((item) => {
					if ( item.searchable ) {
						searchRow[ item.cellIdx ] = item;
					}
					else {
						searchRow[ item.cellIdx ] = null;
					}
				});

			}
			return cell;
		});

		return [ ...rows, searchRow ];
	};
	normalizeHeaderCells = (row: Array<IHeaderOptions>, rowIdx: number): Array<INormalizedHeaderItem> => {
		return row.map((cell: IHeaderOptions, i: number) => {
			return {
				rowIdx,
				cellIdx:     i,
				title:       cell.title,
				id:          cell.id || '',
				colClass:    cell.options && cell.options.colClass ? cell.options.colClass : '',
				headerClass: cell.options && cell.options.headerClass ? cell.options.headerClass : '',
				span:        cell.options && cell.options.span ? cell.options.span : 1,
				sort:        -1,
				get searchable (): boolean {
					return cell.options !== void 0 &&
						cell.options.searchable === true &&
						this.span === 1;
				},
				get sortable (): boolean {
					return cell.options !== void 0 &&
						cell.options.sortable === true &&
						this.span === 1;
				}

			};

		});
	};
	normalizeRows = (headers): INormalizedRowItem[][] => {
		return this.props.rows.map((row: IRowTypes, i: number) => {

			if ( Array.isArray(row) ) {
				return this.normalizeCells(row as ITableTypes[], headers, i);
			}
			else {
				let ObjRow: ITableTypes[][] = Object.keys(row).map((c) => {
					return [ c, row[ c ] ];
				});

				return this.normalizeCells(ObjRow, headers, i);
			}
		});
	};
	normalizeCells = (row, headers: INormalizedHeaderItem[][], rowIdx: number): Array<INormalizedRowItem> => {
		let parseSearchText = (v): string | number => {
			let value = Array.isArray(v) ? v[ 1 ] : v;
			return React.isValidElement(value) ? '' : value;
		};
		let a: Array<INormalizedRowItem> = row.map((c, i, a) => {
			let iHeaders;
			let fHeaders = headers
				.find((item, idx) => item.length === a.length && item[ i ].id !== '')
				.find((m) => {
					return m.id === c[ 0 ];
				});
			if ( !fHeaders ) {
				iHeaders = headers
					.find((item, idx) => item.length === a.length && item[ i ].id !== '')
					.find((m) => {
						return m.cellIdx === i;
					});
			}

			return {
				rowIdx,
				cellIdx:    fHeaders ? fHeaders.cellIdx : i,
				text:       Array.isArray(c) ? c[ 1 ] : c,
				searchText: parseSearchText(c),
				id:         fHeaders ? fHeaders.id : iHeaders.id,
				colClass:   fHeaders ? fHeaders.colClass : iHeaders.colClass
			};

		});
		return a;
	};

	sortRows = (direction: any, id: string) => {
		let rows = this.state.normalizedRows;
		let sortRows = rows.sort((a: any, b: any) => {
			let pprev = a.find((item) => item.id === id),
				pnext = b.find((item) => item.id === id);
			let prev = isNaN(Number(pprev)) ? pprev.searchText.toUpperCase() : Number(pprev),
				next = isNaN(Number(pprev)) ? pnext.searchText.toUpperCase() : Number(pnext);
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
	filterRows = (filterObj) => {
		let filteredRows = this.state.normalizedRows.filter((row) => {

			let matchArr: Array<boolean> = [];
			for ( let key in filterObj ) {
				let current = filterObj[ key ];
				let target = JSON.parse(current.target);
				let reg = new RegExp(current.value, 'i');

				let match = current.value.trim() ? reg.test(row[ target.cellIdx ].searchText) : true;
				matchArr.push(match);
			}
			return matchArr.indexOf(false) === -1;
		});
		this.setState({
			currentRows:      filteredRows,
			currentRowLength: filteredRows.length,
			rowPosition:      0
		});

	};
	setPaging = (v) => {
		this.setState({rowsPerPage: {...this.state.rowsPerPage, ...{value: v}}});
		this.props.paging ? this.props.paging(v) : '';
	};
	setPosition = (v) => {
		this.setState({rowPosition: v});
	};

	render () {
		let {rowPosition, totalRecordCount} = this.props;
		return (
			<div className="table-wrapper">
				<table className={this.props.className}>
					<Header
						headers={this.state.normalizedHeaders}
						sort={this.props.sort || this.sortRows}
						filter={this.props.filter || this.filterRows}
					/>
					<Rows items={this.state.currentRows}
						  rowsPerPage={this.state.rowsPerPage}
						  position={this.state.rowPosition}
					/>
					<Footer
						setPaging={ this.setPaging}
						rowsPerPage={this.state.rowsPerPage}
						setPosition={this.setPosition}
						position={this.state.rowPosition}
						rowLength={ this.state.rowLength}
						currentRowLength={this.state.currentRowLength}
						colLength={this.state.colLength}
					/>
				</table>
			</div>


		);
	}
}

