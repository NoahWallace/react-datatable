/// <reference types="react" />
import * as React from 'react';
import { ITableTypes } from '../../ITable';
export interface ISortableHeaderCellProps {
    cellIdx: number;
    rowIdx: number;
    setSort: (cellIdx: number, rowIdx: number, id: string) => void;
    id: string;
    title: ITableTypes;
    sort: number;
    headerClass: string;
}
export declare const SortableHeaderCell: React.StatelessComponent<ISortableHeaderCellProps>;
