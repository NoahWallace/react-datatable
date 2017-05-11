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
var util_1 = require("util");
var Header_1 = require("./Header");
var Rows_1 = require("./Rows");
var Footer_1 = require("./Footer");
require("./Table.scss");
var CEHTable = (function (_super) {
    __extends(CEHTable, _super);
    function CEHTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            normalizedHeaders: [],
            normalizedRows: [],
            rowLength: 0,
            colLength: 0,
            currentRows: [],
            currentRowLength: 0,
            rowsPerPage: 10,
            rowsPerPageOptions: [10, 25, 50, 100],
            rowPosition: 0,
            control: {
                sort: false,
                setRowsPerPage: false,
                setPosition: false,
                search: false,
                callback: function () {
                    console.log('Control callback function has not been set');
                }
            },
            sort: {
                direction: undefined,
                id: undefined
            },
            waiting: false
        };
        _this.getWaitingRows = function (normalizedHeaders) {
            var max = -Infinity;
            var index = -1;
            normalizedHeaders.forEach(function (a, i) {
                if (a.length > max) {
                    max = a.length;
                    index = i;
                }
            });
            var rpp = _this.props.rowsPerPage || _this.state.rowsPerPage;
            var rows = new Array(rpp);
            for (var r = 0; r < rpp; r++) {
                var row = new Array(max);
                for (var c = 0; c < max; c++) {
                    row[c] = (React.createElement("div", { className: "wait-cell" }, " "));
                }
                rows[r] = (row);
            }
            return rows;
        };
        _this.normalizeHeaderRows = function () {
            var searchRow = [];
            var rows = _this.props.headers.map(function (row, i) {
                var cell = _this.normalizeHeaderCells(row, i);
                if (cell.length > searchRow.length) {
                    searchRow = new Array(cell.length);
                    cell.map(function (item) {
                        if (item.searchable) {
                            searchRow[item.cellIdx] = item;
                        }
                        else {
                            searchRow[item.cellIdx] = null;
                        }
                    });
                }
                return cell;
            });
            return rows.concat([searchRow]);
        };
        _this.normalizeHeaderCells = function (row, rowIdx) {
            return row.map(function (cell, i) {
                return {
                    rowIdx: rowIdx,
                    cellIdx: i,
                    title: cell.title,
                    id: cell.id || '',
                    colClass: cell.options && cell.options.colClass ? cell.options.colClass : '',
                    headerClass: cell.options && cell.options.headerClass ? cell.options.headerClass : '',
                    span: cell.options && cell.options.span ? cell.options.span : 1,
                    sort: -1,
                    get searchable() {
                        return cell.options !== void 0 &&
                            cell.options.searchable === true &&
                            this.span === 1;
                    },
                    get sortable() {
                        return cell.options !== void 0 &&
                            cell.options.sortable === true &&
                            this.span === 1;
                    }
                };
            });
        };
        _this.normalizeRows = function (headers, rows) {
            if (!rows || rows.length === 0) {
                return [];
            }
            var workingRows = rows.slice(0, _this.props.limit || 100);
            return workingRows.map(function (row, i) {
                if (Array.isArray(row)) {
                    return _this.normalizeCells(row, headers, i);
                }
                else {
                    var ObjRow = Object.keys(row).map(function (c) {
                        return [c, row[c]];
                    });
                    return _this.normalizeCells(ObjRow, headers, i);
                }
            });
        };
        _this.normalizeCells = function (row, headers, rowIdx) {
            var parseSearchText = function (v) {
                var value = Array.isArray(v) ? v[1] : v;
                return React.isValidElement(value) ? '' : value;
            };
            return row.map(function (c, i, a) {
                var iHeaders;
                try {
                    var fHeaders = headers.find(function (item, idx) {
                        return item.length === a.length && !util_1.isNull(item[i]) && item[i].id !== '';
                    }).find(function (m) {
                        return m.id === c[0];
                    });
                    if (!fHeaders) {
                        iHeaders = headers
                            .find(function (item, idx) { return item.length === a.length && item[i].id !== ''; })
                            .find(function (m) {
                            return m.cellIdx === i;
                        });
                    }
                    return {
                        rowIdx: rowIdx,
                        cellIdx: fHeaders ? fHeaders.cellIdx : i,
                        text: Array.isArray(c) ? c[1] : c,
                        searchText: parseSearchText(c),
                        id: fHeaders ? fHeaders.id : iHeaders.id,
                        colClass: fHeaders ? fHeaders.colClass : iHeaders.colClass
                    };
                }
                catch (e) {
                    console.error('It appears there is an issue when parsing/normalizing your row index. Validate that your largest header length is equal to your row length');
                    throw e;
                }
            });
        };
        _this.sortRows = function (direction, id) {
            if (_this.props.control && _this.props.control.sort) {
                _this.userControl('sort', { sort: { direction: direction, id: id } });
                _this.setState({ sort: { direction: direction, id: id } });
            }
            else {
                var _a = _this.state, normalizedRows = _a.normalizedRows, currentRows = _a.currentRows, rows = currentRows.length < normalizedRows.length ? currentRows : normalizedRows, sortRows = rows.sort(function (a, b) {
                    var pprev = a.find(function (item) { return item.id === id; }), pnext = b.find(function (item) { return item.id === id; }), prev = isNaN(Number(pprev)) ? pprev.searchText.toUpperCase() : Number(pprev), next = isNaN(Number(pprev)) ? pnext.searchText.toUpperCase() : Number(pnext);
                    if (direction === 0) {
                        return prev < next ? -1 : prev > next ? 1 : 0;
                    }
                    ;
                    if (direction === 1) {
                        return prev < next ? 1 : prev > next ? -1 : 0;
                    }
                    ;
                    return 0;
                });
                _this.setState({ currentRows: sortRows });
            }
        };
        _this.filterRows = function (filter) {
            if (_this.state.control && _this.state.control.search) {
                _this.userControl('search', { filter: filter });
            }
            else {
                var filteredRows = _this.state.normalizedRows.filter(function (row) {
                    var matchArr = [];
                    for (var key in filter) {
                        var current = filter[key];
                        var target = JSON.parse(current.target);
                        var reg = new RegExp(current.value, 'i');
                        var match = current.value.trim() ? reg.test(row[target.cellIdx].searchText) : true;
                        matchArr.push(match);
                    }
                    return matchArr.indexOf(false) === -1;
                });
                _this.setState({
                    currentRows: filteredRows,
                    currentRowLength: _this.props.totalRecordCount || filteredRows.length,
                    rowPosition: 0
                });
            }
        };
        _this.setRowsPerPage = function (rpp) {
            _this.props.control && _this.props.control.setRowsPerPage ? _this.userControl('setRowsPerPage', { rpp: rpp }) :
                _this.setState({ rowsPerPage: rpp });
        };
        _this.setPosition = function (pos) {
            _this.props.control && _this.props.control.setPosition ? _this.userControl('setPosition', { pos: pos }) :
                _this.setState({ rowPosition: pos });
        };
        _this.userControl = function (type, k) {
            var actionObj = {
                action: type,
                query: k.hasOwnProperty('filter') ? k.filter : {},
                sort: {
                    direction: k.hasOwnProperty('sort') ? k.sort.direction : _this.state.sort.direction,
                    id: k.hasOwnProperty('sort') ? k.sort.id : _this.state.sort.id,
                },
                paging: {
                    rowsPerPage: k.hasOwnProperty('rpp') ? k.rpp : _this.state.rowsPerPage,
                    position: k.hasOwnProperty('pos') ? k.pos : _this.state.rowPosition
                }
            };
            _this.state.control.callback(actionObj);
        };
        return _this;
    }
    CEHTable.prototype.componentDidMount = function () {
        var rows;
        var normalizedHeaders = this.normalizeHeaderRows();
        rows = this.props.waiting ? this.getWaitingRows(normalizedHeaders) : this.props.rows;
        var normalizedRows = this.normalizeRows(normalizedHeaders, rows);
        var colLength = normalizedHeaders.reduce(function (a, i, ii) {
            return ii === 1 ? a : i.length > a.length ? i : a;
        });
        this.setState({
            normalizedHeaders: normalizedHeaders,
            normalizedRows: normalizedRows,
            currentRows: normalizedRows,
            currentRowLength: this.props.totalRecordCount || normalizedRows.length,
            rowLength: this.props.totalRecordCount || normalizedRows.length,
            rowsPerPage: this.props.rowsPerPage || this.state.rowsPerPage,
            rowsPerPageOptions: this.props.rowsPerPageOptions || this.state.rowsPerPageOptions,
            rowPosition: this.props.rowPosition || 0,
            colLength: colLength.length,
            control: __assign({}, this.state.control, this.props.control),
            waiting: this.props.waiting || false
        });
    };
    CEHTable.prototype.componentWillReceiveProps = function (nextProps) {
        console.log(nextProps.waiting);
        var rows = nextProps.waiting ? this.getWaitingRows(this.state.normalizedHeaders) : nextProps.rows;
        var normalizedRows = this.normalizeRows(this.state.normalizedHeaders, rows);
        this.setState({
            normalizedRows: normalizedRows,
            currentRows: normalizedRows,
            currentRowLength: nextProps.totalRecordCount || normalizedRows.length,
            rowLength: nextProps.totalRecordCount || normalizedRows.length,
            rowsPerPage: nextProps.rowsPerPage || this.state.rowsPerPage,
            rowPosition: nextProps.rowPosition || 0,
        });
    };
    CEHTable.prototype.render = function () {
        return (React.createElement("div", { className: "ceh-table-wrapper" },
            React.createElement("table", { className: this.props.className },
                React.createElement(Header_1.Header, { headers: this.state.normalizedHeaders, sort: this.sortRows, filter: this.filterRows, control: this.state.control }),
                React.createElement(Rows_1.Rows, { items: this.state.currentRows, rowsPerPage: this.state.rowsPerPage, position: this.state.rowPosition, footer: this.props.footer, control: this.props.control }),
                this.props.footer && React.createElement(Footer_1.Footer, { setRowsPerPage: this.setRowsPerPage, rowsPerPage: this.state.rowsPerPage, rowsPerPageOptions: this.state.rowsPerPageOptions, setPosition: this.setPosition, position: this.state.rowPosition, rowLength: this.state.rowLength, currentRowLength: this.state.currentRowLength, colLength: this.state.colLength, control: this.state.control }))));
    };
    return CEHTable;
}(React.Component));
exports.CEHTable = CEHTable;
