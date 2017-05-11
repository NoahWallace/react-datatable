"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var close_thin_1 = require("adp-react-icons/lib/adp/close-thin");
var SearchHeaderCell = (function (_super) {
    __extends(SearchHeaderCell, _super);
    function SearchHeaderCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClear = function (e) {
            e.target.value = "";
            _this[_this.props.id].value = "";
            _this.props.search(e);
        };
        return _this;
    }
    SearchHeaderCell.prototype.render = function () {
        var _this = this;
        var _a = this.props, id = _a.id, search = _a.search, rowIdx = _a.rowIdx, cellIdx = _a.cellIdx, headerClass = _a.headerClass;
        return (React.createElement("th", { className: 'search' + headerClass },
            React.createElement("div", null,
                this[id] && this[id].value &&
                    React.createElement("span", { onClick: this.handleClear, "data-id": id, "data-target": JSON.stringify({ rowIdx: rowIdx, cellIdx: cellIdx, id: id }) },
                        React.createElement(close_thin_1.default, null)),
                React.createElement("input", { type: "text", ref: function (ref) { return _this[id] = ref; }, "data-id": id, "data-target": JSON.stringify({ rowIdx: rowIdx, cellIdx: cellIdx, id: id }), onKeyUp: search }))));
    };
    return SearchHeaderCell;
}(React.Component));
exports.SearchHeaderCell = SearchHeaderCell;
;
