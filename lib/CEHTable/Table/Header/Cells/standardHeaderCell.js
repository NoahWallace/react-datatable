"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.StandardHeaderCell = function (props) {
    var title = props.title, span = props.span, headerClass = props.headerClass;
    var classNames = span > 1 ? "group " + headerClass : headerClass;
    return (React.createElement("th", { colSpan: span, className: classNames },
        React.createElement("div", null, title)));
};
