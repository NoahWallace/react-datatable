import './Public/CSS/Layout.scss';
import 'adp-css-framework/dist/adp-css-framework.css';
import 'proxima-nova/css/proxima-nova.css';

import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Layout} from "./Layout";

ReactDom.render(<Layout/>,document.getElementById("app"))