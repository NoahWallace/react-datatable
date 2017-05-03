import * as React from 'react';

export class Rows extends React.Component<any, any> {
	getCells = (row: any) => {
		return row.map((cell: any) => <div className="cell">{cell}</div>);
	};
	getRows = () => {
		return this.props.items
			.filter((row,i)=>{

				return i>=this.props.position && i<this.props.position+this.props.rpp})
			.map((row: any) => <div className="row">{this.getCells(row)}</div>);
	};

	render () {

		return (
			<div className="table-body">
				{this.getRows()}
			</div>
		);
	}
}