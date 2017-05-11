import { ReactElement } from 'react';

export type ITableTypes = number | string | JSX.Element;
export type IRowTypes = Array<ITableTypes> | { [key: string]: ITableTypes };
/*
 React Elements Should not be used in sortable or searchable columns
 */
export interface ITableProps {
	className?: string;
	rowPosition?: number;
	limit?: number;
	rowsPerPage?: number;
	rowsPerPageOptions?:Array<number>

	recordCount?: number;
	totalRecordCount?: number;
	footer?:boolean;
	rows: IRowTypes[];
	headers: IHeaderOptions[][];
	control?:IHTTPControl;
	waiting?:boolean;


}
export interface ITableState {
	normalizedHeaders: INormalizedHeaderItem[][];
	normalizedRows: INormalizedRowItem[][];
	currentRows: INormalizedRowItem[][];
	rowLength: number;
	currentRowLength: number;
	colLength: number;
	sort?: {direction: 0 | 1, id: string};
	rowsPerPageOptions?:number[];
	rowsPerPage?:number;
	rowPosition: number;
	control?:IHTTPControl
	waiting:boolean;
}

export interface INormalizedHeaderItem {
	rowIdx: number;
	cellIdx: number;
	title: ITableTypes;
	id: string;
	colClass: string;
	headerClass: string;
	span: number;
	sort: number;
	searchable: boolean;
	sortable: boolean;
}
export interface INormalizedRowItem {
	rowIdx: number;
	cellIdx: number;
	text: ITableTypes;
	searchText: string;
	id: string;
	colClass: string;

}

export interface IHeaderOptions {
	title: ITableTypes;
	id: string;
	options?: {
		sortable?: boolean,
		searchable?: boolean,
		span?: number,
		headerClass?: string,
		colClass?: string
	};
}

export interface IHTTPControl{
	sort?:boolean;
	setRowsPerPage?:boolean;
	setPosition?:boolean;
	search?:boolean;
	callback:(param:IHTTPControlCallbackObj)=>void;
}
export type ControlTypes = "setRowsPerPage" | "setPosition" | "sort";
export interface IHTTPControlCallbackObj{
		action:string;
		paging:{
			position:number;
			rowsPerPage:number
		};
		query:{}
		sort:{
			direction:0|1;
			id:string;
		}
}

