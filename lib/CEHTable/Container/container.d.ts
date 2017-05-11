/// <reference types="react" />
import * as React from 'react';
import './container.scss';
export declare class Container extends React.Component<any, any> {
    state: {
        search: {
            visible: boolean;
        };
    };
    toggleSearch: () => void;
    render(): JSX.Element;
}
