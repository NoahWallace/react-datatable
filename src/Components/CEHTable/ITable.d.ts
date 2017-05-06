import { ReactElement } from 'react';

export type ITableTypes = number | string | JSX.Element;
export type IRowTypes = Array<ITableTypes> | { [key: string]: ITableTypes };
/*
 React Elements Should not be used in sortable or searchable columns
 */
export interface ITableProps {
	className: string;

	rowPosition?: number;
	limit?: number;
	rowsPerPage?: {
		value: number;
		options?: Array<number>;

	};
	recordCount?: number;
	totalRecordCount?: number;

	rows: Array<IRowTypes>;
	headers: Array<Array<IHeaderOptions>>;
	sort?: (direction: 0 | 1, id: string) => void;
	paging?: (rowsPerPage: number) => void;
	filter?: (filterObj: any) => void;
	pageSelect?: Array<number>;
	control?:{
		sort:boolean;
		paging:boolean;
		search:boolean;
		callback:(param)=>void;
	}

}
export interface ITableState {
	normalizedHeaders: INormalizedHeaderItem[][],
	normalizedRows: INormalizedRowItem[][],
	rowLength: number,
	colLength: number,
	currentRows: INormalizedRowItem[][],
	currentRowLength: number,
	rowsPerPage?: {
		value: number;
		options?: Array<number>;
	},
	rowPosition: number,
	control?:{
		sort:boolean;
		paging:boolean;
		search:boolean;
		callback:(param)=>void;
	}
}
export interface INormalizedHeaderItem {
	rowIdx: number;
	cellIdx: number;
	title: string | number | JSX.Element;
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
	title: string | number | JSX.Element;
	//id should only be assigned to the column headers not group headers
	id?: string;
	options?: {
		sortable?: boolean,
		searchable?: boolean,
		span?: number,
		headerClass?: string,
		colClass?: string
	};
}

