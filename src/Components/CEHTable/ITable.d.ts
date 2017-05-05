
import { ReactElement } from 'react';
export interface ITableFields {
	position?:number;
	limit?:number;
	rpp?:number;
	recordCount?:number;
	totalRecordCount?:number;

	rows:|Array<Array<any> | {[key:string]:string | number | ReactElement<any>}>;
	headers:Array<Array<string | number | IHeaderOptions>>;
	sort?:(direction:SortOptions, id:string)=>void;
	paging?:(rpp:number)=>void;
	filter?:(filterObj:any)=>void;
	headerRows?:any;

}


export type SortOptions = 0|1;
export interface IHeaderOptions{
	title:string;
	id?:string;
	options?:{
		sortable?:boolean,
		searchable?:boolean,
		initialSort?: SortOptions,
		currentSort?: SortOptions,
		span?:number
	};
}

