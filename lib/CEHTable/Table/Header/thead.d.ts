/// <reference types="react" />
import * as React from 'react';
import { INormalizedHeaderItem } from '../ITable';
export interface IHeaderState {
    query: IQueryObj;
    headerState: {
        [key: string]: INormalizedHeaderItem;
    };
}
export interface IHeaderProps {
    headers: INormalizedHeaderItem[][];
}
export interface IQueryObj {
    [id: string]: {
        value?: string | number;
        target: string;
    };
}
export interface ISearchTarget {
    cellIdx: number;
    rowIdx: number;
    id: string;
}
export declare class Header extends React.Component<any, IHeaderState> {
    state: {
        query: {};
        headerState: {};
    };
    componentWillReceiveProps(nextProps: any): void;
    getRows: () => JSX.Element[];
    getCells: (cells: INormalizedHeaderItem[], rowIdx: number, lastRow: boolean) => JSX.Element[];
    setSort: (cellIdx: number, rowIdx: number, id: string, reset?: boolean) => void;
    initSearch: () => void;
    search: (e: any) => void;
    render(): JSX.Element;
}
