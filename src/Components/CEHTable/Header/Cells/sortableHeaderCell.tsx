import * as React from 'react';
import AngleDown from 'adp-react-icons/lib/fa/angle-down';
import AngleUp from 'adp-react-icons/lib/fa/angle-up';
import { ITableTypes } from '../../ITable';

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
		let angles = <span><i><AngleDown/><AngleUp/></i></span>;
		let ad = <span><i><AngleDown/></i></span>;
		let au = <span><i><AngleUp/></i></span>;
		return (
			<th className={'sort ' + headerClass}>
				<div className="sort-text" onClick={(e) => setSort(cellIdx, rowIdx, id)}>
					<div >{title}</div>
					{sort === -1 ? angles : sort === 0 ? au : ad}

				</div>
			</th>
		);

	}
;