
export interface ITableFields {
	skip?:number;
	limit?:number;
	rpp?:number;
	recordCount?:number;
	totalRecordCount?:number;
	rows:Array<Array<any>>;
	headers:Array<Array<string | number | IHeaderOptions>>;
	sort?:(idx:number,direction:SortOptions, key:string)=>void;
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

