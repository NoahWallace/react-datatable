import * as React from 'react';

export interface ITableRowsProps {
	items:Array<number | string | JSX.Element>
	position:number;
	rpp:number;
}

export class Rows extends React.Component<ITableRowsProps, any> {
	getCells = (row: any, rowIdx) => {
		return row.map((cell: any, i: number) => <td key={`b_cell_${rowIdx}_${i}`}>{cell}</td>);
	};
	getRows = () => {
		return this.props.items
			.filter((row, i) => {
				return i >= this.props.position && i < this.props.position + this.props.rpp;
			})
			.map((row: any, i: number) => <tr key={`b_row_${i}`}>{this.getCells(row, i)}</tr>);
	};

	render () {

		return (
			<tbody className="table-body">
			{this.getRows()}
			</tbody>
		);
	}
}