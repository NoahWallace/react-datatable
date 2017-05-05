import * as React from 'react';

export interface ITableRowsProps {
	items: Array<number | string | JSX.Element>,
	headers: any;
	columnIndex: any;
	position: number;
	rpp: number;
}

export class Rows extends React.Component<ITableRowsProps, any> {
	getRows = () => {console.log(this.props.position)
		return this.props.items
			.filter((row, i) => {
				return i >= this.props.position && i < this.props.position + this.props.rpp;
			})
			.map((row: any, i: number) => {
					return <tr key={`b_row_${i}`}>{this.getCells(row, i)}</tr>;
			});
	};
	getCells = (row: any, rowIdx) => {
		return row.sort((a,b)=>{
			let prev=a.cellIdx;
			let next=b.cellIdx;
			return prev < next ? -1: 1;
		}).map((cell: any, i: number) => {
			return <td key={`b_cell_${rowIdx}_${cell.cellIdx}`} className={cell.colClass}>{cell.text}</td>
			}
		);
	};


	render () {

		return (
			<tbody className="table-body">
				{this.getRows()}
			</tbody>
		);
	}
}