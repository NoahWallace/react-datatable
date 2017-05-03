export interface ITableFields{
	skip?:number;
	limit?:number;
	rpp?:number;
	recordCount?:number;
	totalRecordCount?:number;
	rows:Array<Array<any>>;
	headers:Array<string | number | IHeaderOptions>;
	sort?:(idx:number,direction:SortOptions, key:string)=>any;

}


export type SortOptions = 0|1;
export interface IHeaderOptions{
	Title:string;
	Id?:string;
	Options?:{
		sortable:boolean,
		searchable?:boolean,
		initialSort?: SortOptions,
		currentSort?: SortOptions
	};
}

