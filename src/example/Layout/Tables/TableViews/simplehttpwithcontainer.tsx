import * as React from 'react';

import { CEHTable,Container } from '../../../../Components/CEHTable';

import {mockdata1} from '../../mockData/mockdata1';
import {mockHeaders} from '../../mockData/headers'




export class HttpSimpleTableWithContainer extends React.Component<any,any> {

	componentWillMount(){

		this.setState({tableHeaders:mockHeaders.simple})
		this.getData().then((d)=>{
			this.setState({tableRows:d})
		})
	}
	getData = ():Promise<any> =>{
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				let data= mockdata1.filter((r,i)=>i<130)
				resolve(data);
			},300)

		})
	}
	render() {
		return (
			<div>
				<Container>
				<CEHTable
					className=""
					headers={mockHeaders.simple}
					rows={this.state.tableRows}
					limit={23}
				/>
				</Container>
			</div>
		);
	}
};