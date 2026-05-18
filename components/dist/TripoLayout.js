"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var TripoLayout_module_css_1 = require("./TripoLayout.module.css");
var image_1 = require("next/image");
// antd 核心组件
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var TripoLayout = function (_a) {
    var _b, _c;
    var children = _a.children;
    var _d = react_1.useState(280), panelWidth = _d[0], setPanelWidth = _d[1];
    var _e = react_1.useState(180), bottomHeight = _e[0], setBottomHeight = _e[1];
    var isDraggingLeft = react_1.useRef(false);
    var isDraggingRight = react_1.useRef(false);
    var isDraggingBottom = react_1.useRef(false);
    var startY = react_1.useRef(0);
    var startX = react_1.useRef(0);
    var startSize = react_1.useRef(0);
    var _f = react_1.useState(false), open = _f[0], setOpen = _f[1];
    var _g = react_1.useState("image"), activeTab = _g[0], setActiveTab = _g[1];
    var _h = react_1.useState({
        model: "gpt_image_2",
        prompt: "",
        aspectRatio: "1:1",
        imageCount: 4,
        style: "none",
        fontSize: "10px",
        pose: "无",
        multiView: false
    }), imageForm = _h[0], setImageForm = _h[1];
    var _j = react_1.useState({
        name: "",
        modeType: "标准",
        aiModel: "Meshy 6",
        imageEnhance: true,
        multiView: false
    }), modalForm = _j[0], setModalForm = _j[1];
    var _k = react_1.useState({
        search: "",
        selectAnim: ""
    }), actionForm = _k[0], setActionForm = _k[1];
    var _l = react_1.useState(false), modelDropdownOpen = _l[0], setModelDropdownOpen = _l[1];
    // 完整模型列表（和截图完全一致）
    var modelList = [
        {
            value: "gpt_image_2",
            label: "GPT Image 2",
            icon: "🔵",
            isPro: false
        },
        {
            value: "nano_banana_pro",
            label: "Nano Banana Pro",
            icon: "🟡",
            isPro: true
        },
        {
            value: "nano_banana_2",
            label: "Nano Banana 2",
            icon: "🟠",
            isPro: false
        },
        {
            value: "nano_banana",
            label: "Nano Banana",
            icon: "🟣",
            isPro: false
        },
    ];
    // 其他选项列表
    var ratioList = ["1:1", "16:9", "9:16", "4:3", "3:4"];
    var countList = [1, 2, 3, 4];
    var poseList = ["无", "A 姿势", "T 姿势"];
    var styleList = ["无", "写实", "动漫", "科幻"];
    var _m = react_1.useState(false), styleShow = _m[0], setStyleShow = _m[1]; // 左侧拖拽（改宽度，用 clientX）
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
            react_1["default"].createElement("aside", { className: TripoLayout_module_css_1["default"].sidebarWrapper },
                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].navColumn },
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].navItem + " " + (activeTab === "image" ? TripoLayout_module_css_1["default"].navItemActive : ""), onClick: function () { return setActiveTab("image"); } },
                        react_1["default"].createElement("span", { className: TripoLayout_module_css_1["default"].navIcon }, "\uD83D\uDDBC\uFE0F"),
                        react_1["default"].createElement("span", { className: TripoLayout_module_css_1["default"].navText }, "\u56FE\u50CF")),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].navItem + " " + (activeTab === "model" ? TripoLayout_module_css_1["default"].navItemActive : ""), onClick: function () { return setActiveTab("model"); } },
                        react_1["default"].createElement("span", { className: TripoLayout_module_css_1["default"].navIcon }, "\uD83E\uDDCA"),
                        react_1["default"].createElement("span", { className: TripoLayout_module_css_1["default"].navText }, "\u6A21\u578B")),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].navItem + " " + (activeTab === "animation" ? TripoLayout_module_css_1["default"].navItemActive : ""), onClick: function () { return setActiveTab("animation"); } },
                        react_1["default"].createElement("span", { className: TripoLayout_module_css_1["default"].navIcon }, "\uD83C\uDFC3"),
                        react_1["default"].createElement("span", { className: TripoLayout_module_css_1["default"].navText }, "\u52A8\u753B"))),
                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].contentPanel },
                    activeTab === "image" && (react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].panelContainer },
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].panelBlock },
                            react_1["default"].createElement("p", { className: TripoLayout_module_css_1["default"].panelTitle }, "\u4EBA\u5DE5\u667A\u80FD\u6A21\u578B"),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].modelDropdown, onClick: function () { return setModelDropdownOpen(!modelDropdownOpen); }, style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "10px 14px",
                                    borderRadius: "12px",
                                    background: "#222",
                                    cursor: "pointer"
                                } },
                                react_1["default"].createElement("div", { style: {
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "8px",
                                        background: "linear-gradient(135deg,#4facfe,#00f2fe)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "16px"
                                    } }, (_b = modelList.find(function (m) { return m.value === imageForm.model; })) === null || _b === void 0 ? void 0 : _b.icon),
                                react_1["default"].createElement("span", { style: { fontSize: "15px", color: "#fff", flex: 1 } }, (_c = modelList.find(function (m) { return m.value === imageForm.model; })) === null || _c === void 0 ? void 0 : _c.label),
                                react_1["default"].createElement("span", { style: {
                                        fontSize: "18px",
                                        color: "#aaa",
                                        // 核心：让箭头在span内垂直居中
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        // 移除错误的 marginRight: "100px,"（这个样式会把箭头推偏）
                                        // 如果需要和右侧保持间距，可以加 marginLeft: "auto" 让箭头靠右居中
                                        marginLeft: "auto",
                                        marginRight: "18px"
                                    } }, modelDropdownOpen ? "⌃" : "⌄")),
                            modelDropdownOpen && (react_1["default"].createElement("div", { style: {
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    marginTop: "4px",
                                    background: "#2a2a2a",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    border: "1px solid #333",
                                    zIndex: 999,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                                } }, modelList.map(function (item) { return (react_1["default"].createElement("div", { key: item.value, onClick: function () {
                                    setImageForm(function (prev) { return (__assign(__assign({}, prev), { model: item.value })); });
                                    setModelDropdownOpen(false);
                                }, style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "10px 14px",
                                    cursor: "pointer",
                                    background: imageForm.model === item.value
                                        ? "#2b2b2b"
                                        : "transparent"
                                } },
                                react_1["default"].createElement("div", { style: {
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "8px",
                                        background: item.value === "gpt_image_2"
                                            ? "linear-gradient(135deg,#4facfe,#00f2fe)"
                                            : item.value === "nano_banana_pro"
                                                ? "#f7c948"
                                                : item.value === "nano_banana_2"
                                                    ? "#ff9a3c"
                                                    : "#b565e7",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "18px"
                                    } }, "\uD83C\uDF4C"),
                                react_1["default"].createElement("div", { style: { flex: 1 } },
                                    react_1["default"].createElement("span", { style: { color: "#fff", fontSize: "16px" } }, item.label),
                                    item.isPro && (react_1["default"].createElement("span", { style: {
                                            background: "#794cff",
                                            fontSize: "12px",
                                            padding: "2px 6px",
                                            borderRadius: "4px",
                                            marginLeft: "6px"
                                        } }, "PRO"))),
                                imageForm.model === item.value && (react_1["default"].createElement("span", { style: { color: "#fff", fontSize: "18px" } }, "\u2713")))); })))),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].panelBlock },
                            react_1["default"].createElement("p", { className: TripoLayout_module_css_1["default"].panelTitle }, "\u63D0\u793A"),
                            react_1["default"].createElement("textarea", { className: TripoLayout_module_css_1["default"].textareaPrompt, placeholder: "\u63CF\u8FF0\u60A8\u60F3\u751F\u6210\u7684\u56FE\u50CF\u3002\u60A8\u53EF\u4EE5\u4F7F\u7528\u60A8\u7684\u6BCD\u8BED\uFF0C\u4F8B\u5982\uFF0C\u4E00\u53EA\u53EF\u7231\u7684\u5C0F\u72D7", maxLength: 800, value: imageForm.prompt, onChange: function (e) {
                                    return setImageForm(__assign(__assign({}, imageForm), { prompt: e.target.value }));
                                } }),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].charCount },
                                imageForm.prompt.length,
                                "/800")),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].panelBlock },
                            react_1["default"].createElement("p", { className: TripoLayout_module_css_1["default"].panelTitle }, "\u7EB5\u6A2A\u6BD4"),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].buttonRow }, ratioList.map(function (item) { return (react_1["default"].createElement("button", { key: item, className: TripoLayout_module_css_1["default"].tagBtn + " " + (imageForm.aspectRatio === item ? TripoLayout_module_css_1["default"].tagActive : ""), onClick: function () {
                                    return setImageForm(__assign(__assign({}, imageForm), { aspectRatio: item }));
                                } }, item)); }))),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].panelBlock },
                            react_1["default"].createElement("p", { className: TripoLayout_module_css_1["default"].panelTitle }, "\u56FE\u50CF\u6570\u91CF"),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].buttonRow },
                                countList.map(function (item) { return (react_1["default"].createElement("button", { key: item, className: TripoLayout_module_css_1["default"].tagBtn + " " + (imageForm.imageCount === item ? TripoLayout_module_css_1["default"].tagActive : ""), onClick: function () {
                                        return setImageForm(__assign(__assign({}, imageForm), { imageCount: item }));
                                    } }, item)); }),
                                react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].tagBtn }, "\u2304"))),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].panelBlock },
                            react_1["default"].createElement("p", { className: TripoLayout_module_css_1["default"].panelTitle }, "\u98CE\u683C\u5316"),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].styleSelect, onClick: function () { return setStyleShow(!styleShow); } },
                                react_1["default"].createElement("span", null,
                                    "\uD83D\uDEAB ",
                                    imageForm.style),
                                react_1["default"].createElement("span", { className: TripoLayout_module_css_1["default"].settingIcon }, "\u26ED")),
                            styleShow && (react_1["default"].createElement("div", { style: {
                                    background: "#222",
                                    padding: 8,
                                    borderRadius: 6
                                } }, styleList.map(function (item) { return (react_1["default"].createElement("div", { key: item, style: { padding: "6px 0", cursor: "pointer" }, onClick: function () {
                                    setImageForm(__assign(__assign({}, imageForm), { style: item }));
                                    setStyleShow(false);
                                } }, item)); })))),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].switchItem },
                            react_1["default"].createElement("span", null, "\u591A\u89C6\u56FE"),
                            react_1["default"].createElement("input", { type: "checkbox", className: TripoLayout_module_css_1["default"].toggleSwitch, checked: imageForm.multiView, onChange: function (e) {
                                    return setImageForm(__assign(__assign({}, imageForm), { multiView: e.target.checked }));
                                } })),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].panelBlock },
                            react_1["default"].createElement("p", { className: TripoLayout_module_css_1["default"].panelTitle }, "\u59FF\u52BF"),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].buttonRow }, poseList.map(function (item) { return (react_1["default"].createElement("button", { key: item, className: TripoLayout_module_css_1["default"].tagBtn + " " + (imageForm.pose === item ? TripoLayout_module_css_1["default"].tagActive : ""), onClick: function () {
                                    return setImageForm(__assign(__assign({}, imageForm), { pose: item }));
                                } }, item)); }))),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].bottomMeta },
                            react_1["default"].createElement("span", null, "15\u79D2"),
                            react_1["default"].createElement("span", null, "\uD83D\uDCB0 6 \u00D7 4 = 24")),
                        react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].generateBtn }, "\u2728 \u751F\u6210"))),
                    activeTab === "model" && (react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].panelContainer },
                        react_1["default"].createElement("p", { className: TripoLayout_module_css_1["default"].panelTitle }, "\u56FE\u50CF"),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].uploadBox },
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].uploadIcon }, "\u2B06\uFE0F"),
                            react_1["default"].createElement("p", null, "\u70B9\u51FB/\u62D6\u653E/\u7C98\u8D34\u56FE\u50CF"),
                            react_1["default"].createElement("p", { className: TripoLayout_module_css_1["default"].uploadTip },
                                "\u652F\u6301\u7684\u683C\u5F0F\uFF1A.png,.jpg,.jpeg,.webp ",
                                react_1["default"].createElement("br", null),
                                "\u6700\u5927\u5927\u5C0F\uFF1A20MB")),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].panelBlock },
                            react_1["default"].createElement("p", { className: TripoLayout_module_css_1["default"].panelTitle }, "\u540D\u79F0 \u24D8"),
                            react_1["default"].createElement("input", { className: TripoLayout_module_css_1["default"].normalInput, placeholder: "\u4E3A\u4F60\u7684\u751F\u6210\u547D\u540D", value: modalForm.name, onChange: function (e) {
                                    return setModalForm(__assign(__assign({}, modalForm), { name: e.target.value }));
                                } })),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].panelBlock },
                            react_1["default"].createElement("p", { className: TripoLayout_module_css_1["default"].panelTitle }, "\u6A21\u5F0F\u7C7B\u578B \u24D8"),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].buttonRow },
                                react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].tagBtn + " " + (modalForm.modeType === "标准" ? TripoLayout_module_css_1["default"].tagActive : ""), onClick: function () {
                                        return setModalForm(__assign(__assign({}, modalForm), { modeType: "标准" }));
                                    } }, "\u6807\u51C6"),
                                react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].tagBtn, onClick: function () {
                                        return setModalForm(__assign(__assign({}, modalForm), { modeType: "低模 (Beta)" }));
                                    } }, "\u4F4E\u6A21 (Beta)"))),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].panelBlock },
                            react_1["default"].createElement("p", { className: TripoLayout_module_css_1["default"].panelTitle }, "\u4EBA\u5DE5\u667A\u80FD\u6A21\u578B"),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].modelDropdown }, modalForm.aiModel)),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].switchItem },
                            react_1["default"].createElement("span", null, "\u56FE\u50CF\u589E\u5F3A \u24D8"),
                            react_1["default"].createElement("input", { type: "checkbox", checked: modalForm.imageEnhance, className: TripoLayout_module_css_1["default"].toggleSwitch, onChange: function (e) {
                                    return setModalForm(__assign(__assign({}, modalForm), { imageEnhance: e.target.checked }));
                                } })),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].switchItem },
                            react_1["default"].createElement("span", null, "\u591A\u89C6\u56FE (Beta) \uD83D\uDC51"),
                            react_1["default"].createElement("input", { type: "checkbox", className: TripoLayout_module_css_1["default"].toggleSwitch, checked: modalForm.multiView, onChange: function (e) {
                                    return setModalForm(__assign(__assign({}, modalForm), { multiView: e.target.checked }));
                                } })),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].bottomMeta },
                            react_1["default"].createElement("span", null, "1\u5206\u949F"),
                            react_1["default"].createElement("span", null, "\uD83D\uDCB0 20")),
                        react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].generateBtn }, "\u2728 \u751F\u6210"))),
                    activeTab === "animation" && (react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].panelContainer },
                        react_1["default"].createElement("input", { className: TripoLayout_module_css_1["default"].searchInput, placeholder: "\uD83D\uDD0D \u641C\u7D22\u52A8\u753B", value: actionForm.search, onChange: function (e) {
                                return setActionForm(__assign(__assign({}, actionForm), { search: e.target.value }));
                            } }),
                        react_1["default"].createElement("p", { className: TripoLayout_module_css_1["default"].sectionTitle }, "\uD83D\uDCF6 \u5E93"),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animTopBar },
                            react_1["default"].createElement("span", { className: TripoLayout_module_css_1["default"].boldText }, "\uD83D\uDCA1 \u9AA8\u9ABC\u7ED1\u5B9A\u6A21\u578B"),
                            react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].boneBtn }, "\u26D3\uFE0F \u7ED1\u5B9A\u9AA8\u9ABC")),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animGrid },
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animCard },
                                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animPreview }, "\u2694\uFE0F"),
                                react_1["default"].createElement("p", null, "\u4E09\u8FDE\u51FB")),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animCard },
                                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animPreview }, "\uD83E\uDD1D"),
                                react_1["default"].createElement("p", null, "\u540C\u610F\u624B\u52BF")),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animCard },
                                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animPreview }, "\uD83D\uDEB6\u200D\u2640\uFE0F"),
                                react_1["default"].createElement("p", null, "\u5973\u6027\u6B65\u884C")),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animCard },
                                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animPreview }, "\uD83D\uDC83"),
                                react_1["default"].createElement("p", null, "\u5C3D\u60C5\u821E\u8E48")),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animCard },
                                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animPreview }, "\uD83C\uDFC3"),
                                react_1["default"].createElement("p", null, "\u5FEB\u8DD1")),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animCard },
                                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animPreview }, "\uD83E\uDDB8"),
                                react_1["default"].createElement("p", null, "\u6280\u80FD 1")),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animCard },
                                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animPreview }, "\uD83E\uDD38"),
                                react_1["default"].createElement("p", null, "\u6280\u80FD 3")),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animCard },
                                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animPreview }, "\uD83E\uDD4A"),
                                react_1["default"].createElement("p", null, "\u62F3\u51FB\u7EC3\u4E60")),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animCard },
                                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animPreview }, "\uD83D\uDC4A"),
                                react_1["default"].createElement("p", null, "\u653B\u51FB")),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animCard },
                                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animPreview }, "\uD83D\uDEB6"),
                                react_1["default"].createElement("p", null, "\u6B65\u884C")),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animCard },
                                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animPreview }, "\uD83D\uDC80"),
                                react_1["default"].createElement("p", null, "\u6B7B\u4EA1")),
                            react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animCard },
                                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].animPreview }, "\uD83E\uDDCD"),
                                react_1["default"].createElement("p", null, "\u7A7A\u95F2"))))))),
            react_1["default"].createElement("aside", { className: TripoLayout_module_css_1["default"].sidebarRight, style: { width: panelWidth + "px" } },
                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].topnav }, "\u8D44\u4EA7"),
                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].upgrade },
                    react_1["default"].createElement("span", { className: TripoLayout_module_css_1["default"].upgradeText },
                        "\u5347\u7EA7\u5373\u53EF\u89E3\u9501\u65E0\u9650\u6A21\u578B\u4E0B\u8F7D\u3001",
                        react_1["default"].createElement("br", null),
                        "Ultra\u6A21\u578B\u751F\u6210\u53CA\u66F4\u591A\u9AD8\u7EA7\u529F\u80FD\uFF0C",
                        react_1["default"].createElement("br", null),
                        "\u6700\u9AD85\u6298\u4F18\u60E0"),
                    react_1["default"].createElement("button", { className: TripoLayout_module_css_1["default"].upBtn }, "\u5347\u7EA7")),
                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].navWrap },
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].btnGroup },
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].iconBtn },
                            react_1["default"].createElement("img", { src: "/image/sgg.png", alt: "", style: {
                                    backgroundColor: "white",
                                    borderRadius: 20,
                                    width: 31,
                                    height: 31
                                } })),
                        react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].iconBtn },
                            react_1["default"].createElement("img", { src: "/image/Gc_115_face-Star.png", alt: "" }))),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].singleBtn },
                        react_1["default"].createElement("img", { src: "/image/sl.png", alt: "" })),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].manageBtn },
                        react_1["default"].createElement("img", { src: "/image/gli.png", alt: "" }),
                        react_1["default"].createElement("span", null, "\u7BA1\u7406"))),
                react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].gridContainer },
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].modelon },
                        react_1["default"].createElement("button", null,
                            react_1["default"].createElement("img", { src: "/image/up.png", alt: "", style: { width: 15, height: 15 } })),
                        react_1["default"].createElement("p", null, "\u4E0A\u4F203D\u6A21\u578B"),
                        react_1["default"].createElement("span", null,
                            "OBJ\u3001FBX\u3001STL\u3001",
                            react_1["default"].createElement("br", null),
                            "GLB ",
                            react_1["default"].createElement("br", null),
                            "\u5927\u5C0F\u2264150MB")),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].modelone },
                        react_1["default"].createElement("img", { src: "/image/1 (1).png", alt: "" }),
                        react_1["default"].createElement("button", null, "i")),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].modelone },
                        react_1["default"].createElement("img", { src: "/image/1 (2).png", alt: "" }),
                        react_1["default"].createElement("button", null, "i")),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].modelone },
                        react_1["default"].createElement("img", { src: "/image/1 (3).png", alt: "" }),
                        react_1["default"].createElement("button", null, "i")),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].modelone },
                        react_1["default"].createElement("img", { src: "/image/1 (4).png", alt: "" }),
                        react_1["default"].createElement("button", null, "i")),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].modelone },
                        react_1["default"].createElement("img", { src: "/image/1 (5).png", alt: "" }),
                        react_1["default"].createElement("button", null, "i")),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].modelone },
                        react_1["default"].createElement("img", { src: "/image/1 (6).png", alt: "" }),
                        react_1["default"].createElement("button", null, "i")),
                    react_1["default"].createElement("div", { className: TripoLayout_module_css_1["default"].modelone },
                        react_1["default"].createElement("img", { src: "/image/1 (7).png", alt: "" }),
                        react_1["default"].createElement("button", null, "i"))),
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
