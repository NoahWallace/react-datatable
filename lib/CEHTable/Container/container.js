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
var Header_1 = require("./Header");
var Search_1 = require("./Search");
require("./container.scss");
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            search: {
                visible: true
            }
        };
        _this.toggleSearch = function () {
            var search = _this.state.search;
            search.visible = !search.visible;
            _this.setState(__assign({}, _this.state.search, search));
        };
        return _this;
    }
    Container.prototype.render = function () {
        return (React.createElement("div", { className: "ceh-complex-container" },
            React.createElement(Header_1.Header, { toggleSearch: this.toggleSearch, search: this.state.search }),
            React.createElement("div", { className: "ceh-complex-body" },
                this.state.search.visible && React.createElement(Search_1.Searchbox, { toggleSearch: this.toggleSearch }),
                this.props.children)));
    };
    return Container;
}(React.Component));
exports.Container = Container;
