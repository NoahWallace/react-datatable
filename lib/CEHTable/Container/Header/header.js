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
var filter_1 = require("adp-react-icons/lib/fa/filter");
var abc = function () { return (React.createElement("div", null, "123")); };
var options = {
    search: {
        display: true,
        position: 0
    },
    custom: [
        { display: true, position: 1, component: abc }
    ]
};
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        var active = this.props.search.visible ? "active" : "";
        return (React.createElement("div", { className: "container-header" },
            React.createElement("ul", null,
                React.createElement("li", { className: active, onClick: this.props.toggleSearch },
                    React.createElement(filter_1.default, null),
                    " Search & Filter (7)"))));
    };
    return Header;
}(React.Component));
exports.Header = Header;
