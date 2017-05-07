import * as React from 'react';

import { CEHTable } from '../../../Components/CEHTable';
import {mockdata1} from '../mockData/mockdata1';
import {mockHeaders} from '../mockData/headers'




export class HttpPagingTable extends React.Component<any,any> {
	state={
		tableRows:[],
		totalRecordCount:0,
		action:"",
		query:{},
		sort:{
			direction:0,
			id:""
		},
		paging:{
			rowsPerPage:10,
			position:0
		}


	}
	componentWillMount(){

		this.setState({
			tableHeaders:mockHeaders.simple,

		})
		this.getData(this.state).then((d)=>{
			this.setState({
				tableRows:d,
				totalRecordCount:mockdata1.length
			})
		})
	}
	getData = (o):Promise<any> =>{
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				let data= mockdata1.filter((r,i)=>{
					return i >= o.paging.position && i< o.paging.position + o.paging.rowsPerPage})

				resolve(data);
			},300)

		})
	}
	updateData = (o) =>{

		this.getData(o).then((d)=>{
			o.tableRows=d
			this.setState(o)
		})
	}
	render() {

	return (

		<div>
			<CEHTable
				className="vdl-table"
				headers={mockHeaders.simple}
				rows={this.state.tableRows}
				footer
				rowsPerPage={this.state.paging.rowsPerPage}
				rowPosition={this.state.paging.position}
				totalRecordCount={this.state.totalRecordCount}
				control={{
					setRowsPerPage:true,
					setPosition:true,
					callback:this.updateData
				}}
			/>
		</div>
	);
	}
};