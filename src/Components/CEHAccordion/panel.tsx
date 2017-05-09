import * as React from 'react'

export class Panel extends React.Component<any, any> {
	render (): JSX.Element {
		return (
			<div>
				<div className="header">
					Header
				</div>
				<div className="content">
					someContent
				</div>
			</div>
		)
	}
}