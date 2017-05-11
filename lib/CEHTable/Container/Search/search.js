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
var CEHAccordion_1 = require("../../../CEHAccordion");
var Searchbox = (function (_super) {
    __extends(Searchbox, _super);
    function Searchbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Searchbox.prototype.render = function () {
        return (React.createElement("div", { className: "searchbox" },
            React.createElement("div", { className: "close", onClick: this.props.toggleSearch },
                React.createElement(close_thin_1.default, null)),
            React.createElement(CEHAccordion_1.Accordion, { defaultActiveKey: "1" },
                React.createElement(CEHAccordion_1.Accordion.Panel, { header: "ABCDEF", eventKey: "1" }, "test"))));
    };
    return Searchbox;
}(React.Component));
exports.Searchbox = Searchbox;
