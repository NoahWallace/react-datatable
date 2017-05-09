import * as React from 'react';
import {
	INormalizedHeaderItem, INormalizedRowItem, ITableProps, ITableState, ITableTypes, IHeaderOptions,
	IRowTypes
} from './ITable';
import { isNull } from 'util';
import { Header } from './Header';
import { Rows } from './Rows';
import { Footer } from './Footer';

import './Table.scss';

export class CEHTable extends React.Component<ITableProps, ITableState> {
	state: ITableState = {
		normalizedHeaders:  [],
		normalizedRows:     [],
		rowLength:          0,
		colLength:          0,
		currentRows:        [],
		currentRowLength:   0,
		rowsPerPage:        10,
		rowsPerPageOptions: [ 10, 25, 50, 100 ],
		rowPosition:        0,
		control:            {
			sort:           false,
			setRowsPerPage: false,
			setPosition:    false,
			search:         false,
			callback:       () => {
				console.log('Control callback function has not been set');
			}
		},
		sort:               {
			direction: undefined,
			id:        undefined
		},
		waiting:false
	};

	componentDidMount () {
		let rows;
		let normalizedHeaders: INormalizedHeaderItem[][] = this.normalizeHeaderRows();
		rows=this.props.waiting ? this.getWaitingRows(normalizedHeaders) : this.props.rows;
		let normalizedRows: INormalizedRowItem[][] = this.normalizeRows(normalizedHeaders, rows);
		let colLength = normalizedHeaders.reduce(function (a, i, ii) {
			return ii === 1 ? a : i.length > a.length ? i : a;
		});

		this.setState({
			normalizedHeaders,
			normalizedRows,
			currentRows:        normalizedRows,
			currentRowLength:   this.props.totalRecordCount || normalizedRows.length,
			rowLength:          this.props.totalRecordCount || normalizedRows.length,
			rowsPerPage:        this.props.rowsPerPage || this.state.rowsPerPage,
			rowsPerPageOptions: this.props.rowsPerPageOptions || this.state.rowsPerPageOptions,
			rowPosition:        this.props.rowPosition || 0,
			colLength:          colLength.length,
			control:            {...this.state.control, ...this.props.control},
			waiting: this.props.waiting || false
		});

	}

	componentWillReceiveProps (nextProps) {console.log(nextProps.waiting)
		let rows =nextProps.waiting ? this.getWaitingRows(this.state.normalizedHeaders) : nextProps.rows;
		let normalizedRows: INormalizedRowItem[][] = this.normalizeRows(this.state.normalizedHeaders, rows);
			this.setState({
				normalizedRows,
				currentRows:      normalizedRows,
				currentRowLength: nextProps.totalRecordCount || normalizedRows.length,
				rowLength:        nextProps.totalRecordCount || normalizedRows.length,
				rowsPerPage:      nextProps.rowsPerPage || this.state.rowsPerPage,
				rowPosition:      nextProps.rowPosition || 0,
			});

	}
	getWaitingRows=(normalizedHeaders)=>{
		let max = -Infinity;
		let index = -1;

		normalizedHeaders.forEach((a, i)=>{
			if (a.length>max) {
				max = a.length;
				index = i;
			}
		});
		let rpp=this.props.rowsPerPage || this.state.rowsPerPage;
		let rows=new Array(rpp)
		for(let r=0;r<rpp;r++){
			let row=new Array(max);
			for(let c=0;c<max;c++){
				row[c]=(<div className="wait-cell"> </div>)
			}
			rows[r]=(row);
		}

		return rows
	}
	normalizeHeaderRows = (): INormalizedHeaderItem[][] => {
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
	normalizeHeaderCells = (row: Array<IHeaderOptions>, rowIdx: number): INormalizedHeaderItem[] => {
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
	normalizeRows = (headers, rows): INormalizedRowItem[][] => {

		if ( !rows || rows.length === 0 ) {
			return [];
		}
		let workingRows = rows.slice(0, this.props.limit || 100);
		return workingRows.map((row: IRowTypes, i: number) => {
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
	normalizeCells = (row, headers: INormalizedHeaderItem[][], rowIdx: number): INormalizedRowItem[] => {
		let parseSearchText = (v): string | number => {
			let value = Array.isArray(v) ? v[ 1 ] : v;
			return React.isValidElement(value) ? '' : value;
		};
		return row.map((c, i, a) => {
			let iHeaders;
			try {
				let fHeaders = headers.find((item, idx) => {
					return item.length === a.length && !isNull(item[ i ]) && item[ i ].id !== '';

				}).find((m) => {
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
			}
			catch ( e ) {
				console.error('It appears there is an issue when parsing/normalizing your row index. Validate that your largest header length is equal to your row length');
				throw e;
			}
		});

	};

	sortRows = (direction: 0 | 1, id: string): void => {
		if ( this.props.control && this.props.control.sort ) {
			this.userControl('sort', {sort: {direction, id}});
			this.setState({sort: {direction, id}});
		}
		else {
			let {normalizedRows, currentRows} = this.state,
				rows                          = currentRows.length < normalizedRows.length ? currentRows : normalizedRows,
				sortRows                      = rows.sort((a: any, b: any) => {
					let pprev = a.find((item) => item.id === id),
						pnext = b.find((item) => item.id === id),
						prev  = isNaN(Number(pprev)) ? pprev.searchText.toUpperCase() : Number(pprev),
						next  = isNaN(Number(pprev)) ? pnext.searchText.toUpperCase() : Number(pnext);
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
		}

	};
	filterRows = (filter) => {
		if ( this.state.control && this.state.control.search ) {
			this.userControl('search', {filter});
		}
		else {
			let filteredRows = this.state.normalizedRows.filter((row) => {

				let matchArr: Array<boolean> = [];
				for ( let key in filter ) {
					let current = filter[ key ];
					let target = JSON.parse(current.target);
					let reg = new RegExp(current.value, 'i');

					let match = current.value.trim() ? reg.test(row[ target.cellIdx ].searchText) : true;
					matchArr.push(match);
				}
				return matchArr.indexOf(false) === -1;
			});
			this.setState({
				currentRows:      filteredRows,
				currentRowLength: this.props.totalRecordCount || filteredRows.length,
				rowPosition:      0
			});
		}

	};
	setRowsPerPage = (rpp) => {
		this.props.control && this.props.control.setRowsPerPage ? this.userControl('setRowsPerPage', {rpp}) :
			this.setState({rowsPerPage: rpp});
	};
	setPosition = (pos) => {
		this.props.control && this.props.control.setPosition ? this.userControl('setPosition', {pos}) :
			this.setState({rowPosition: pos});
	};
	userControl = (type: string, k) => {
		let actionObj = {
			action: type,
			query:  k.hasOwnProperty('filter') ? k.filter : {},
			sort:   {
				direction: k.hasOwnProperty('sort') ? k.sort.direction : this.state.sort.direction,
				id:        k.hasOwnProperty('sort') ? k.sort.id : this.state.sort.id,
			},
			paging: {
				rowsPerPage: k.hasOwnProperty('rpp') ? k.rpp : this.state.rowsPerPage,
				position:    k.hasOwnProperty('pos') ? k.pos : this.state.rowPosition
			}
		};
		this.state.control.callback(actionObj);
	};

	render () {

		return (
			<div className="ceh-table-wrapper">
				<table className={this.props.className}>
					<Header
						headers={this.state.normalizedHeaders}
						sort={this.sortRows}
						filter={this.filterRows}
						control={this.state.control}
					/>
					<Rows items={this.state.currentRows}
						  rowsPerPage={this.state.rowsPerPage}
						  position={this.state.rowPosition}
						  footer={this.props.footer}
						  control={this.props.control}
					/>
					{this.props.footer && <Footer
						setRowsPerPage={this.setRowsPerPage}
						rowsPerPage={this.state.rowsPerPage}
						rowsPerPageOptions={this.state.rowsPerPageOptions}
						setPosition={this.setPosition}
						position={this.state.rowPosition}
						rowLength={ this.state.rowLength}
						currentRowLength={this.state.currentRowLength}
						colLength={this.state.colLength}
						control={this.state.control}
					/>
					}
				</table>
			</div>


		);
	}
}

