"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var caret_down_1 = require("adp-react-icons/lib/fa/caret-down");
var caret_up_1 = require("adp-react-icons/lib/fa/caret-up");
exports.SortableHeaderCell = function (props) {
    var cellIdx = props.cellIdx, rowIdx = props.rowIdx, setSort = props.setSort, id = props.id, title = props.title, sort = props.sort, headerClass = props.headerClass;
    var angles = React.createElement("span", null,
        React.createElement("i", null,
            React.createElement(caret_up_1.default, null)),
        React.createElement("i", null,
            React.createElement(caret_down_1.default, null)));
    var ad = React.createElement("span", null,
        React.createElement("i", null,
            React.createElement(caret_down_1.default, null)));
    var au = React.createElement("span", null,
        React.createElement("i", null,
            React.createElement(caret_up_1.default, null)));
    return (React.createElement("th", { className: 'sort ' + headerClass },
        React.createElement("div", { className: "sort-text", onClick: function (e) { return setSort(cellIdx, rowIdx, id); } },
            React.createElement("div", null, title),
            sort === -1 ? angles : sort === 1 ? au : ad)));
};
