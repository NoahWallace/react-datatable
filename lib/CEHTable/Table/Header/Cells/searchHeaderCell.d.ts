/// <reference types="react" />
import * as React from 'react';
export interface ISearchHeaderCellProps {
    id: string;
    rowIdx: number;
    cellIdx: number;
    headerClass: string;
    search: (event: any) => void;
}
export declare class SearchHeaderCell extends React.Component<ISearchHeaderCellProps, {}> {
    handleClear: (e: any) => void;
    render(): JSX.Element;
}
