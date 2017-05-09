import * as React from 'react';
import {ITableTypes} from '../../Table/ITable'

export interface IStandardHeaderCellProps{
	title:ITableTypes
	span:number;
	headerClass:string;
}

export const StandardHeaderCell: React.StatelessComponent<IStandardHeaderCellProps> = (props) => {
	let {title, span, headerClass} = props;

	return (
		<th colSpan={span} className={headerClass}>
			<div>{title}</div>
		</th>
	);
};