import * as React from 'react';

import { CEHTable } from '../../../../Components/CEHTable';
import {mockdata1} from '../../mockData/mockdata1';
import {mockHeaders} from '../../mockData/headers'

let mockData=mockdata1.slice(0,100);


export const SimpleTable = () => {

	return (
		<div>
			<CEHTable
				className=""
				headers={mockHeaders.simple}
				rows={mockData}
				limit={23}
			/>
		</div>
	);
};