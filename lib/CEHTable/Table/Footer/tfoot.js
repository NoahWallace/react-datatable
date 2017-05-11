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
var adp_react_components_1 = require("adp-react-components");
var pagination_next_1 = require("adp-react-icons/lib/adp/pagination-next");
var pagination_last_1 = require("adp-react-icons/lib/adp/pagination-last");
var pagination_previous_1 = require("adp-react-icons/lib/adp/pagination-previous");
var pagination_first_1 = require("adp-react-icons/lib/adp/pagination-first");
var Footer = (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.goToStart = function () {
            _this.props.setPosition(0);
        };
        _this.goBack = function () {
            var pos = _this.props.position - _this.props.rowsPerPage;
            pos < 0 ? pos = 0 : '';
            _this.props.setPosition(pos);
        };
        _this.goForward = function () {
            var pos = _this.props.position + _this.props.rowsPerPage;
            pos >= _this.props.rowLength ? pos = _this.props.position : '';
            _this.props.setPosition(pos);
        };
        _this.goToEnd = function () {
            var _a = _this.props, currentRowLength = _a.currentRowLength, rowsPerPage = _a.rowsPerPage;
            var remainder = currentRowLength % rowsPerPage;
            var pos = remainder === 0 ? currentRowLength - rowsPerPage : currentRowLength - remainder;
            _this.props.setPosition(pos);
        };
        _this.setPaging = function (v) {
            _this.props.setRowsPerPage(v);
        };
        _this.setPager = function () {
            var _a = _this.props, position = _a.position, currentRowLength = _a.currentRowLength, rowsPerPage = _a.rowsPerPage;
            var current = position + rowsPerPage > currentRowLength ? currentRowLength : position + rowsPerPage;
            return {
                position: position + 1,
                currentRowLength: currentRowLength,
                current: current,
                currentPage: Math.floor(position / rowsPerPage),
                totalPages: Math.ceil(currentRowLength / rowsPerPage)
            };
        };
        return _this;
    }
    Footer.prototype.componentWillReceiveProps = function (nextProps) {
    };
    Footer.prototype.render = function () {
        var pager = this.setPager();
        var st = {};
        st.first = pager.position - this.props.rowsPerPage < 0;
        st.back = pager.position < 2;
        st.next = pager.current >= pager.currentRowLength;
        st.last = pager.current >= pager.currentRowLength;
        var pageSelect = this.props.rowsPerPageOptions.map(function (v, i) { return React.createElement("option", { key: i, value: v }, v); });
        return (React.createElement("tfoot", null,
            React.createElement("tr", null,
                React.createElement("td", { colSpan: this.props.colLength },
                    React.createElement("div", null,
                        React.createElement("span", { className: "pages" }, "Rows Per Page"),
                        React.createElement(adp_react_components_1.DropdownList, { value: this.props.rowsPerPage, data: this.props.rowsPerPageOptions, onChange: this.setPaging }),
                        React.createElement("button", { className: st.first ? 'pagerbtn disabled' : 'pagerbtn', onClick: this.goToStart },
                            React.createElement("i", null,
                                React.createElement(pagination_first_1.default, null))),
                        React.createElement("button", { className: st.back ? 'pagerbtn disabled' : 'pagerbtn', onClick: this.goBack },
                            React.createElement("i", null,
                                React.createElement(pagination_previous_1.default, null))),
                        React.createElement("div", { className: "text" }, pager.currentPage + 1 + " of " + pager.totalPages),
                        React.createElement("button", { className: st.next ? 'pagerbtn disabled' : 'pagerbtn', disabled: st.next, onClick: this.goForward },
                            React.createElement("i", null,
                                React.createElement(pagination_next_1.default, null))),
                        React.createElement("button", { className: st.last ? 'pagerbtn disabled' : 'pagerbtn', disabled: st.last, onClick: this.goToEnd },
                            React.createElement("i", null,
                                React.createElement(pagination_last_1.default, null))))))));
    };
    return Footer;
}(React.Component));
exports.Footer = Footer;
