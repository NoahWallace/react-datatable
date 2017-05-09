import * as React from 'react';
import {Header} from './Header';
import {Searchbox} from './Search';

import './container.scss'

export class Container extends React.Component<any,any>{
	state={
		search:{
			visible:true
		}
	}
	toggleSearch=()=>{
		let search=this.state.search;
		search.visible=!search.visible;
		this.setState({...this.state.search,...search})
	}
	render(){
		return (
			<div className="ceh-complex-container">
				<Header toggleSearch={this.toggleSearch} search={this.state.search}/>
				<div className="ceh-complex-body">
				{this.state.search.visible && <Searchbox  toggleSearch={this.toggleSearch} />}
				{this.props.children}
				</div>
			</div>
		)
	}
}