import * as React from 'react';
import CloseThin from 'adp-react-icons/lib/adp/close-thin';


export interface ISearchHeaderCellProps {
	id:string;
	rowIdx:number;
	cellIdx:number;
	headerClass:string;
	search:(event:any)=>void;

}


export class SearchHeaderCell extends React.Component<ISearchHeaderCellProps, {}> {
	handleClear=(e)=>{
		e.target.value="";
		this[this.props.id].value="";
		this.props.search(e);
	}
	render () {
		let {id, search, rowIdx, cellIdx, headerClass} = this.props;
		return (
			<th className={'search' + headerClass}>
				<div>
					{this[id] && this[id].value &&
					<span  onClick={this.handleClear}
						   data-id={id}
						   data-target={JSON.stringify({rowIdx, cellIdx, id})}
					><i><CloseThin /></i></span>}
					<input type="text"
						   ref={(ref)=>this[id]=ref}
						   data-id={id}
						   data-target={JSON.stringify({rowIdx, cellIdx, id})}
						   onKeyUp={search}
					/>
				</div>
			</th>
		);
	}
}
;