"use strict";
exports.__esModule = true;
var react_1 = require("react");
var TripoLayout_module_css_1 = require("./TripoLayout.module.css");
var image_1 = require("next/image");
// antd 核心组件
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var TripoLayout = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(280), panelWidth = _b[0], setPanelWidth = _b[1];
    var _c = react_1.useState(180), bottomHeight = _c[0], setBottomHeight = _c[1];
    var isDraggingLeft = react_1.useRef(false);
    var isDraggingRight = react_1.useRef(false);
    var isDraggingBottom = react_1.useRef(false);
    var startY = react_1.useRef(0);
    var startX = react_1.useRef(0);
    var startSize = react_1.useRef(0);
    var _d = react_1.useState(false), open = _d[0], setOpen = _d[1];
    // 左侧拖拽（改宽度，用 clientX）
    var handleLeftMouseDown = function (e) {
        e.preventDefault();
        isDraggingLeft.current = true;
        startX.current = e.clientX;
        startSize.current = panelWidth;
        document.addEventListener("mousemove", handleLeftMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };
    var handleLeftMouseMove = function (e) {
        if (!isDraggingLeft.current)
            return;
        var deltaX = e.clientX - startX.current;
        var newWidth = Math.max(200, Math.min(400, startSize.current + deltaX));
        setPanelWidth(newWidth);
    };
    // 右侧拖拽（左侧把手：向左拖加宽）
    var handleRightMouseDown = function (e) {
        e.preventDefault();
        isDraggingRight.current = true;
        startX.current = e.clientX;
        startSize.current = panelWidth;
        document.addEventListener("mousemove", handleRightMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };
    var handleRightMouseMove = function (e) {
        if (!isDraggingRight.current)
            return;
        var deltaX = e.clientX - startX.current;
        var newWidth = Math.max(200, Math.min(400, startSize.current - deltaX));
        setPanelWidth(newWidth);
    };
    // 底部拖拽
    var handleBottomMouseDown = function (e) {
        isDraggingBottom.current = true;
        startY.current = e.clientY;
        startSize.current = bottomHeight;
        document.addEventListener("mousemove", handleBottomMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };
    var handleBottomMouseMove = function (e) {
        if (!isDraggingBottom.current)
            return;
        var deltaY = e.clientY - startY.current;
        var newHeight = Math.max(120, Math.min(320, startSize.current + deltaY));
        setBottomHeight(newHeight);
    };
    // 结束拖拽
    var handleMouseUp = function () {
        isDraggingLeft.current = false;
        isDraggingRight.current = false;
        isDraggingBottom.current = false;
        document.removeEventListener("mousemove", handleLeftMouseMove);
        document.removeEventListener("mousemove", handleRightMouseMove);
        document.removeEventListener("mousemove", handleBottomMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };
    react_1.useEffect(function () {
        return function () {
            document.removeEventListener("mousemove", handleLeftMouseMove);
            document.removeEventListener("mousemove", handleRightMouseMove);
            document.removeEventListener("mousemove", handleBottomMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);
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
    return (react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].layoutWrapper },
        react_1["default"].createElement("header", { className: TripoLayout_module_css_1["default"].topNav },
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
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].resetPasswordLink }, "\u8BBE\u7F6E/\u91CD\u7F6E\u5BC6\u7801")))))),
        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].bodyContent },
            react_1["default"].createElement("main", { className: TripoLayout_module_css_1["default"].canvas }, children),
            react_1["default"].createElement("aside", { className: TripoLayout_module_css_1["default"].sidebarLeft, style: { width: panelWidth + "px" } },
                react_1["default"].createElement("div", null, "\u5DE6\u4FA7\u9762\u677F"),
                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].resizeHandle, onMouseDown: handleLeftMouseDown })),
            react_1["default"].createElement("aside", { className: TripoLayout_module_css_1["default"].sidebarRight, style: { width: panelWidth + "px" } },
                react_1["default"].createElement("div", null, "\u53F3\u4FA7\u9762\u677F"),
                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].resizeHandle, onMouseDown: handleRightMouseDown })),
            react_1["default"].createElement("footer", { className: TripoLayout_module_css_1["default"].bottomBar, style: { minHeight: bottomHeight + "px" } },
                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].brushBar },
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].brushItem + " " + TripoLayout_module_css_1["default"].brushWhite }),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].brushItem + " " + TripoLayout_module_css_1["default"].brushMetal + " " + TripoLayout_module_css_1["default"].active }),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].brushItem + " " + TripoLayout_module_css_1["default"].brushSetting },
                        react_1["default"].createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "2" },
                            react_1["default"].createElement("path", { d: "M7 8h10M7 12h4m1 0h4M7 16h6" }))),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].brushItem + " " + TripoLayout_module_css_1["default"].brushGray }),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].brushItem + " " + TripoLayout_module_css_1["default"].brushColorful }),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].brushItem + " " + TripoLayout_module_css_1["default"].brushGold }),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].brushItem + " " + TripoLayout_module_css_1["default"].brushSilver }),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].brushItem + " " + TripoLayout_module_css_1["default"].brushCyan })),
                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].actionBar },
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].actionLeft },
                        react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].actionBtn, title: "\u64A4\u9500" },
                            react_1["default"].createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#ccc", strokeWidth: "2" },
                                react_1["default"].createElement("path", { d: "M19 12H5M12 19l-7-7 7-7" }))),
                        react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].actionBtn, title: "\u91CD\u505A" },
                            react_1["default"].createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#ccc", strokeWidth: "2" },
                                react_1["default"].createElement("path", { d: "M5 12h14M12 5l7 7-7 7" }))),
                        react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].actionBtn + " " + TripoLayout_module_css_1["default"].retryBtn, title: "\u514D\u8D39\u91CD\u8BD5" },
                            react_1["default"].createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "2" },
                                react_1["default"].createElement("path", { d: "M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" })),
                            react_1["default"].createElement("span", null, "\u514D\u8D39\u91CD\u8BD5")),
                        react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].actionBtn, title: "\u793C\u7269" },
                            react_1["default"].createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#ccc", strokeWidth: "2" },
                                react_1["default"].createElement("path", { d: "M20 12v10H4V12M2 7h20v5H2V7z" }),
                                react_1["default"].createElement("path", { d: "M12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" }),
                                react_1["default"].createElement("path", { d: "M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" }))),
                        react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].actionBtn, title: "\u661F\u7403" },
                            react_1["default"].createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#ccc", strokeWidth: "2" },
                                react_1["default"].createElement("circle", { cx: "12", cy: "12", r: "10" }),
                                react_1["default"].createElement("path", { d: "M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" }))),
                        react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].actionBtn + " " + TripoLayout_module_css_1["default"].printBtn, title: "3D\u6253\u5370" },
                            react_1["default"].createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#ccc", strokeWidth: "2" },
                                react_1["default"].createElement("path", { d: "M19 11V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6M3 11h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-10z" }),
                                react_1["default"].createElement("path", { d: "M12 19v-6" })),
                            react_1["default"].createElement("span", null, "3D\u6253\u5370"),
                            react_1["default"].createElement("span", { className: TripoLayout_module_css_1["default"].newTag }, "New")),
                        react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].actionBtn, title: "\u6536\u85CF" },
                            react_1["default"].createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#ccc", strokeWidth: "2" },
                                react_1["default"].createElement("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }))),
                        react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].actionBtn, title: "\u5206\u4EAB" },
                            react_1["default"].createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#ccc", strokeWidth: "2" },
                                react_1["default"].createElement("path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v12" })),
                            react_1["default"].createElement("span", { className: TripoLayout_module_css_1["default"].score }, "+300"))),
                    react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].exportBtn, title: "\u5BFC\u51FA" },
                        react_1["default"].createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "2" },
                            react_1["default"].createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" })),
                        react_1["default"].createElement("span", null, "\u5BFC\u51FA"))),
                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].resizeHandleBottom, onMouseDown: handleBottomMouseDown })))));
};
exports["default"] = TripoLayout;
