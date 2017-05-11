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
var Rows = (function (_super) {
    __extends(Rows, _super);
    function Rows() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getRows = function () {
            if (_this.props.items.length === 0) {
                return;
            }
            return _this.props.items
                .filter(function (row, i) {
                if (_this.props.control && _this.props.control.setPosition) {
                    return true;
                }
                return _this.props.footer ?
                    i >= _this.props.position &&
                        i < _this.props.position + _this.props.rowsPerPage : true;
            })
                .map(function (row, i) {
                return React.createElement("tr", { key: "b_row_" + i }, _this.getCells(row, i));
            });
        };
        _this.getCells = function (row, rowIdx) {
            return row.sort(function (a, b) {
                var prev = a.cellIdx;
                var next = b.cellIdx;
                return prev < next ? -1 : 1;
            }).map(function (cell, i) {
                return React.createElement("td", { key: "b_cell_" + rowIdx + "_" + cell.cellIdx, className: cell.colClass }, cell.text);
            });
        };
        return _this;
    }
    Rows.prototype.render = function () {
        var rows = this.getRows();
        return (React.createElement("tbody", { className: "table__body" }, rows));
    };
    return Rows;
}(React.Component));
exports.Rows = Rows;
