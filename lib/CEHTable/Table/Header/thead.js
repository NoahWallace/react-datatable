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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Cells_1 = require("./Cells");
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            query: {},
            headerState: {}
        };
        _this.getRows = function () {
            return _this.props.headers.map(function (o, rowIdx, a) {
                var lastRow = rowIdx === a.length - 1;
                return o.every(function (c) { return c === null; }) ? null :
                    React.createElement("tr", { key: "h_row_" + rowIdx }, _this.getCells(o, rowIdx, lastRow));
            });
        };
        _this.getCells = function (cells, rowIdx, lastRow) {
            return cells.map(function (c, i) {
                if (c === null) {
                    return React.createElement("th", { key: "h_searchcell_" + i });
                }
                if (lastRow && c.searchable) {
                    return React.createElement(Cells_1.SearchHeaderCell, { key: "h_searchcell_" + i, id: c.id, rowIdx: c.rowIdx, cellIdx: c.cellIdx, headerClass: c.headerClass, search: _this.search });
                }
                if (c.sortable) {
                    return React.createElement(Cells_1.SortableHeaderCell, { setSort: _this.setSort, rowIdx: c.rowIdx, cellIdx: c.cellIdx, id: c.id, headerClass: c.headerClass, title: c.title, sort: _this.state.headerState[rowIdx + "_" + i].sort, key: "h_cell_" + c.rowIdx + "_" + c.cellIdx });
                }
                return React.createElement(Cells_1.StandardHeaderCell, { key: "h_cell_" + c.rowIdx + "_" + c.cellIdx, title: c.title, headerClass: c.headerClass, span: c.span });
            });
        };
        _this.setSort = function (cellIdx, rowIdx, id, reset) {
            var currentState = _this.state.headerState, itemState = currentState[rowIdx + "_" + cellIdx].sort, direction = reset ? 0 : itemState === -1 ? 0 : itemState === 0 ? 1 : 0;
            for (var key in currentState) {
                if (currentState[key] !== null && currentState[key].sort !== -1) {
                    currentState[key].sort = -1;
                }
            }
            if (!reset) {
                currentState[rowIdx + "_" + cellIdx].sort = direction;
                _this.props.sort(direction, currentState[rowIdx + "_" + cellIdx].id);
            }
            _this.setState({ headerState: currentState });
        };
        _this.initSearch = function () {
            var query = _this.state.query;
            for (var key in query) {
                var target = JSON.parse(query[key].target), cellIdx = target.cellIdx, rowIdx = target.rowIdx;
                _this.setSort(cellIdx, rowIdx, target.id, true);
            }
            _this.props.filter(_this.state.query);
        };
        _this.search = function (e) {
            e.preventDefault();
            e.persist();
            if (e.keyCode === 13) {
                _this.initSearch();
            }
            else {
                var v = (_a = {},
                    _a[e.currentTarget.getAttribute('data-id')] = {
                        value: e.type === 'click' ? '' : e.currentTarget.value,
                        target: e.currentTarget.getAttribute('data-target')
                    },
                    _a);
                _this.setState({ query: __assign({}, _this.state.query, v) }, e.type === 'click' ? _this.initSearch : function () { });
            }
            var _a;
        };
        return _this;
    }
    Header.prototype.componentWillReceiveProps = function (nextProps) {
        var headerState = {};
        nextProps.headers.map(function (r, ri) {
            return r.map(function (c, ci) {
                headerState[ri + "_" + ci] = c;
                return;
            });
        });
        this.setState({ headerState: headerState });
    };
    Header.prototype.render = function () {
        var header = this.getRows();
        return (React.createElement("thead", null, header));
    };
    return Header;
}(React.Component));
exports.Header = Header;
;
