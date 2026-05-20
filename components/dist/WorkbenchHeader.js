"use strict";
exports.__esModule = true;
var react_1 = require("react");
var TripoLayout_module_css_1 = require("./TripoLayout.module.css");
var image_1 = require("next/image");
// antd 核心组件
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var WorkbenchHeader = function () {
    var _a = react_1.useState(false), open = _a[0], setOpen = _a[1];
    {
        /* 鼠标移入弹出气泡菜单（Popover实现） */
    }
    var content = (react_1["default"].createElement("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            backgroundColor: "#26292C"
        } },
        react_1["default"].createElement("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                color: "#F2F2F2"
            }, onClick: function () { return setOpen(true); } },
            react_1["default"].createElement(icons_1.UserOutlined, null),
            react_1["default"].createElement("span", null, "\u4E2A\u4EBA\u4FE1\u606F")),
        react_1["default"].createElement("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                color: "#F2F2F2"
            } },
            react_1["default"].createElement(icons_1.ApiOutlined, null),
            react_1["default"].createElement("span", null, "API")),
        react_1["default"].createElement("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                color: "#F2F2F2"
            } },
            react_1["default"].createElement(icons_1.AppstoreAddOutlined, null),
            react_1["default"].createElement("span", null, "\u63D2\u4EF6")),
        react_1["default"].createElement("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                color: "#F2F2F2"
            } },
            react_1["default"].createElement(icons_1.MessageOutlined, null),
            react_1["default"].createElement("span", null, "\u8054\u7CFB\u6211\u4EEC")),
        react_1["default"].createElement("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                color: "#F2F2F2"
            } },
            react_1["default"].createElement(icons_1.LogoutOutlined, null),
            react_1["default"].createElement("span", null, "\u767B\u51FA"))));
    {
        /* 顶部导航栏（通顶） */
    }
    return (react_1["default"].createElement("header", { className: TripoLayout_module_css_1["default"].topNav },
        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].navLeft },
            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].logo }, "Vexo"),
            react_1["default"].createElement("nav", { className: TripoLayout_module_css_1["default"].navMenu },
                react_1["default"].createElement("a", { className: TripoLayout_module_css_1["default"].navItemActive }, "3D \u5DE5\u4F5C\u53F0"),
                react_1["default"].createElement("a", { className: TripoLayout_module_css_1["default"].navItem }, "\u9996\u9875"),
                react_1["default"].createElement("a", { className: TripoLayout_module_css_1["default"].navItem }, "\u8D44\u4EA7"),
                react_1["default"].createElement("a", { className: TripoLayout_module_css_1["default"].navItem }, "\u63A8\u5E7F\u8BA1\u5212"))),
        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].navRight },
            react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].navBtn }, "DCC Bridge"),
            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].userInfo },
                react_1["default"].createElement(image_1["default"], { src: "/image/sd.png", alt: "avatar", width: 25, height: 25 }),
                react_1["default"].createElement("span", null, "280"),
                react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].upgradeBtn },
                    react_1["default"].createElement(image_1["default"], { src: "/image/xhj.png", alt: "avatar", width: 25, height: 25 }),
                    "\u5347\u7EA7"),
                react_1["default"].createElement(image_1["default"], { src: "/image/ld.png", alt: "avatar", width: 22, height: 22 }),
                react_1["default"].createElement(image_1["default"], { src: "/image/dq.png", alt: "avatar", width: 22, height: 22 }),
                react_1["default"].createElement(antd_1.Popover, { content: content, trigger: "hover", placement: "bottomRight" },
                    react_1["default"].createElement(image_1["default"], { src: "/image/grxx.png", width: 22, height: 22, style: { cursor: "pointer", borderRadius: 8 }, alt: "\u4E2A\u4EBA\u4E2D\u5FC3" })),
                react_1["default"].createElement(antd_1.Modal, { open: open, onCancel: function () { return setOpen(false); }, title: "\u7528\u6237\u5934\u50CF", width: 1000, footer: null, className: TripoLayout_module_css_1["default"].userModal, bodyStyle: {
                        height: "600px",
                        overflow: "auto",
                        backgroundColor: "#101115"
                    } },
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].modalBody },
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].avatarCircle },
                            react_1["default"].createElement(icons_1.UserOutlined, { style: { fontSize: 48, color: "#fff" } })),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].formGroup },
                            react_1["default"].createElement("label", { className: TripoLayout_module_css_1["default"].formLabel }, "\u7528\u6237\u5934\u50CF"),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].inputWrapper },
                                react_1["default"].createElement("input", { defaultValue: "\u8BF7\u8F93\u5165\u7528\u6237\u540D", className: TripoLayout_module_css_1["default"].formInput }),
                                react_1["default"].createElement("span", { className: TripoLayout_module_css_1["default"].editIcon }, "\u270E"))),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].formGroup },
                            react_1["default"].createElement("label", { className: TripoLayout_module_css_1["default"].formLabel }, "\u90AE\u7BB1"),
                            react_1["default"].createElement("input", { defaultValue: "\u8BF7\u8F93\u5165\u90AE\u7BB1", className: TripoLayout_module_css_1["default"].formInput })),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].buttonGroup },
                            react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].btnCancel }, "\u53D6\u6D88"),
                            react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].btnSave }, "\u4FDD\u5B58\u66F4\u6539")),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].resetPasswordLink }, "\u8BBE\u7F6E/\u91CD\u7F6E\u5BC6\u7801")))))));
};
exports["default"] = WorkbenchHeader;
