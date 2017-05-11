import * as React from 'react';
import CaretDown from 'adp-react-icons/lib/fa/caret-down';
import CaretUp from 'adp-react-icons/lib/fa/caret-up';
import { ITableTypes } from '../../ITable.d';

export interface ISortableHeaderCellProps{
	cellIdx:number;
	rowIdx:number;
	setSort:(cellIdx:number,rowIdx:number,id:string)=>void;
	id:string;
	title:ITableTypes;
	sort:number;
	headerClass:string;
}


export const SortableHeaderCell:React.StatelessComponent<ISortableHeaderCellProps> = (props) => {


		let {cellIdx, rowIdx, setSort, id, title, sort, headerClass} = props;
	let angles = <span><i><CaretUp/></i><i><CaretDown/></i></span>;
		let ad = <span><i><CaretDown/></i></span>;
		let au = <span><i><CaretUp/></i></span>;
		return (
			<th className={'sort ' + headerClass}>
				<div className="sort-text" onClick={(e) => setSort(cellIdx, rowIdx, id)}>
					<div >{title}</div>
					{sort === -1 ? angles : sort === 1 ? au : ad}

				</div>
			</th>
		);

	}
;