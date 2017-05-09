import * as React from 'react';
import Filter from 'adp-react-icons/lib/fa/filter';


let abc:React.StatelessComponent<any>=()=>(<div>123</div>)
let options={
	search:{
		display:true,
		position:0
	},
	custom:[
		{display:true,position:1,component:abc}
	]

}


export class Header extends React.Component<any,any>{

	render():JSX.Element{
		let active=this.props.search.visible ? "active" : "";
		return(
			<div className="container-header">
				<ul>
					<li className={active} onClick={this.props.toggleSearch}><Filter/> Search &amp; Filter (7)</li>
				</ul>
			</div>
		)
	}

}