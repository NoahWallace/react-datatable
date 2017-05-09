import * as React from 'react';
import CloseThin from 'adp-react-icons/lib/adp/close-thin';
import {Accordion} from '../../../CEHAccordion';

export class Searchbox extends React.Component<any, any> {
	render (): JSX.Element {
		return (
			<div className="searchbox">
				<div className="close" onClick={this.props.toggleSearch}><CloseThin/></div>
				<Accordion defaultActiveKey="1" >
					<Accordion.Panel header="ABCDEF" eventKey="1">
						test
					</Accordion.Panel>

				</Accordion>
			</div>
		)
	}

}