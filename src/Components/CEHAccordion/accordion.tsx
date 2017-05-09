import * as React from 'react';
import {Panel} from './panel'

export class Accordion extends React.Component<any,any>{
	static Panel=Panel;
	render(){
		return(
			<div role="tablist" className="ceh-accordion-panel">
				{this.props.children}
			</div>
		)
	}
}