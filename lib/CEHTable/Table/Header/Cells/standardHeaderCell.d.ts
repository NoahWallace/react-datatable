/// <reference types="react" />
import * as React from 'react';
import { ITableTypes } from '../../ITable';
export interface IStandardHeaderCellProps {
    title: ITableTypes;
    span: number;
    headerClass: string;
}
export declare const StandardHeaderCell: React.StatelessComponent<IStandardHeaderCellProps>;
