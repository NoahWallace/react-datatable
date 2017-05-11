/// <reference types="react" />
import * as React from 'react';
import { INormalizedHeaderItem, INormalizedRowItem, ITableProps, ITableState, IHeaderOptions } from './ITable';
import './Table.scss';
export declare class CEHTable extends React.Component<ITableProps, ITableState> {
    state: ITableState;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    getWaitingRows: (normalizedHeaders: any) => any[];
    normalizeHeaderRows: () => INormalizedHeaderItem[][];
    normalizeHeaderCells: (row: IHeaderOptions[], rowIdx: number) => INormalizedHeaderItem[];
    normalizeRows: (headers: any, rows: any) => INormalizedRowItem[][];
    normalizeCells: (row: any, headers: INormalizedHeaderItem[][], rowIdx: number) => INormalizedRowItem[];
    sortRows: (direction: 0 | 1, id: string) => void;
    filterRows: (filter: any) => void;
    setRowsPerPage: (rpp: any) => void;
    setPosition: (pos: any) => void;
    userControl: (type: string, k: any) => void;
    render(): JSX.Element;
}
