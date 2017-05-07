import * as React from 'react';



export class Rows extends React.Component<any, any> {
	getRows = () => {

		if(this.props.items.length===0){return;}

		return this.props.items
			.filter((row, i) => {
				if(this.props.control.setPosition){return true}
				return this.props.footer ?
					i >= this.props.position &&
					i < this.props.position + this.props.rowsPerPage.value : true
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
		let rows=this.getRows();

		return (
			<tbody className="table__body">
				{rows}
			</tbody>
		);
	}
}