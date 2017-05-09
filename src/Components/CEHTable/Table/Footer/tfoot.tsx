import * as React from 'react';
import {DropdownList} from 'adp-react-components';
import ADPPaginationNext from 'adp-react-icons/lib/adp/pagination-next';
import ADPPaginationLast from 'adp-react-icons/lib/adp/pagination-last';
import ADPPaginationPrev from 'adp-react-icons/lib/adp/pagination-previous';
import ADPPaginationFirst from 'adp-react-icons/lib/adp/pagination-first';

export class Footer extends React.Component<any, any> {


	componentWillReceiveProps (nextProps) {

	}
	goToStart=()=>{
		this.props.setPosition(0)
	}
	goBack = () => {
		let pos = this.props.position - this.props.rowsPerPage;
		pos < 0 ? pos = 0 : '';
		this.props.setPosition(pos);
	};
	goForward = () => {
		let pos = this.props.position + this.props.rowsPerPage;
		pos >= this.props.rowLength ? pos = this.props.position : '';

		this.props.setPosition(pos);
	};
	goToEnd=()=>{
		let {currentRowLength, rowsPerPage} = this.props;
		let remainder = currentRowLength % rowsPerPage;
		let pos = remainder === 0 ? currentRowLength - rowsPerPage : currentRowLength - remainder;
		this.props.setPosition(pos)
	}
	setPaging = (v) => {

		this.props.setRowsPerPage(v);
	};
	setPager = () => {
		let {position,currentRowLength, rowsPerPage } = this.props;

		let current = position + rowsPerPage > currentRowLength ? currentRowLength : position + rowsPerPage;

		return {
			position: position + 1,
			currentRowLength,
			current,
			currentPage:Math.floor(position / rowsPerPage),
			totalPages:Math.ceil(currentRowLength/rowsPerPage)
		};

	};

	render () {
		let pager = this.setPager();
		let st: any = {};

		st.first = pager.position - this.props.rowsPerPage < 0;
		st.back = pager.position <2 ;
		st.next = pager.current >= pager.currentRowLength;
		st.last = pager.current >= pager.currentRowLength;

		let pageSelect = this.props.rowsPerPageOptions.map((v, i) => <option key={i} value={v}>{v}</option>);
		return (
			<tfoot>
			<tr>
				<td colSpan={this.props.colLength}>
					<div>
						<span className="pages">Rows Per Page</span>
						<DropdownList
							value={this.props.rowsPerPage}
							data={this.props.rowsPerPageOptions}
							onChange={this.setPaging}
						/>

						<button className={st.first ? 'pagerbtn disabled' : 'pagerbtn'}
								onClick={this.goToStart}><i><ADPPaginationFirst /></i>
						</button>
						<button className={st.back ? 'pagerbtn disabled' : 'pagerbtn'}
								onClick={this.goBack}
						>
							<i><ADPPaginationPrev /></i>
						</button>
						<div className="pages">{`${pager.currentPage+1} of ${pager.totalPages}`}</div>
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