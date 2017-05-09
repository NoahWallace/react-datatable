import * as React from 'react';
import {ITableTypes} from '../../ITable'

export interface IStandardHeaderCellProps{
	title:ITableTypes
	span:number;
	headerClass:string;
}

export const StandardHeaderCell: React.StatelessComponent<IStandardHeaderCellProps> = (props) => {
	let {title, span, headerClass} = props;
	let classNames = span > 1 ? `group ${headerClass}` : headerClass;

	return (
		<th colSpan={span} className={classNames}>
			<div>{title}</div>
		</th>
	);
};