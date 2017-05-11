import * as React from 'react';

import { CEHTable } from '../../../../Components/CEHTable';
import {mockdata1} from '../../mockData/mockdata1';
import {mockHeaders} from '../../mockData/headers'

let mockData=mockdata1.slice(0,100);


export class WaitingTable extends React.Component<any,any> {
	state={waiting:true}
	constructor(props){
		super(props)
		setInterval(()=>{this.setState({waiting:!this.state.waiting})},10000)
	}
	render() {
		console.log(this.state)
		return (
			<div>
				<CEHTable
					className=""
					headers={mockHeaders.simple}
					rows={mockData}
					limit={23}
					waiting={this.state.waiting}
					footer
				/>
			</div>
		);
	}
};