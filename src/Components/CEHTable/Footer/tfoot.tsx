import * as React from 'react';
import ADPPaginationNext from 'adp-react-icons/lib/adp/pagination-next';
import ADPPaginationLast from 'adp-react-icons/lib/adp/pagination-last';
import ADPPaginationPrev from 'adp-react-icons/lib/adp/pagination-previous';
import ADPPaginationFirst from 'adp-react-icons/lib/adp/pagination-first';

export class Footer extends React.Component<any, any> {
	state = {
		paging:  this.props.rowsPerPage.value,
		disable: {
			first: false,
			back:  false,
			next:  false,
			last:  false
		}
	};

	componentWillReceiveProps (nextProps) {

	}
	goToStart=()=>{
		this.props.setPosition(0)
	}
	goBack = () => {
		let pos = this.props.position - this.props.rowsPerPage.value;
		pos < 0 ? pos = 0 : '';
		this.props.setPosition(pos);
	};
	goForward = () => {
		let pos = this.props.position + this.props.rowsPerPage.value;
		pos >= this.props.rowLength ? pos = this.props.position : '';
		this.props.setPosition(pos);
	};
	goToEnd=()=>{
		this.props.setPosition(this.props.currentRowLength - this.props.currentRowLength % this.props.rowsPerPage.value)
	}
	setPaging = (e) => {
		e.preventDefault();
		this.setState({paging: +e.target.value});
		this.props.setPaging(+e.target.value);
	};
	setPager = () => {
		let position = this.props.position;
		let count = this.props.currentRowLength;
		let current = position + this.props.rowsPerPage.value > count ? count : position + this.props.rowsPerPage.value;

		return {
			position: position + 1,
			count,
			current
		};

	};

	render () {
		let pager = this.setPager();
		let page = `${pager.position} - ${pager.current} of ${pager.count}`;
		let st: any = {};

		st.first = pager.position - this.props.rowsPerPage.value < 0;
		st.back = pager.position <2 ;
		st.next = pager.current >= pager.count;
		st.last = pager.current >= pager.count;

		let pageSelect = this.props.rowsPerPage.options.map((v, i) => <option key={i} value={v}>{v}</option>);
		return (
			<tfoot>
			<tr>
				<td colSpan={this.props.colLength}>
					<div>
						<select onChange={this.setPaging} value={this.props.rowsPerPage.value}>
							{pageSelect}
						</select>
						<button className={st.first ? 'pagerbtn disabled' : 'pagerbtn'}
								onClick={this.goToStart}><i><ADPPaginationFirst /></i>
						</button>
						<button className={st.back ? 'pagerbtn disabled' : 'pagerbtn'} onClick={this.goBack}>
							<i><ADPPaginationPrev /></i></button>
						<div className="pages">{page}</div>
						<button className={st.next ? 'pagerbtn disabled' : 'pagerbtn'} disabled={st.next}
								onClick={this.goForward}><i><ADPPaginationNext /></i></button>
						<button className={st.last ? 'pagerbtn disabled' : 'pagerbtn'} disabled={st.last}
								onClick={this.goToEnd}>
							<i><ADPPaginationLast /></i></button>


					</div>
				</td>
			</tr>
			</tfoot>
		);
	}
}