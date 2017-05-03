import * as React from 'react';

export class Footer extends React.Component<any, any> {
	state = {
		paging: this.props.rpp
	};
	goBack = () => {

		let pos = this.props.position - this.props.rpp;
		pos < 0 ? pos = 0 : '';
		this.props.setPosition(pos);
	};
	goForward = () => {
		let pos = this.props.position + this.props.rpp;
		pos >= this.props.rowLength ? pos = this.props.position : '';
		this.props.setPosition(pos);
	};
	setPaging = (e) => {
		e.preventDefault();
		this.setState({paging: +e.target.value});
		this.props.setPaging(+e.target.value);
	};

	render () {
		return (
			<div className="table-foot">
				<div className="row">
					<button type="button" onClick={this.goBack}>Back</button>
					<button type="button" onClick={this.goForward}>Forward</button>
					<select onChange={this.setPaging} value={this.props.rpp}>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</div>
			</div>
		);
	}
}