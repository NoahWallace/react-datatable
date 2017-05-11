/// <reference types="react" />
import * as React from 'react';
export declare class Footer extends React.Component<any, any> {
    componentWillReceiveProps(nextProps: any): void;
    goToStart: () => void;
    goBack: () => void;
    goForward: () => void;
    goToEnd: () => void;
    setPaging: (v: any) => void;
    setPager: () => {
        position: any;
        currentRowLength: any;
        current: any;
        currentPage: number;
        totalPages: number;
    };
    render(): JSX.Element;
}
