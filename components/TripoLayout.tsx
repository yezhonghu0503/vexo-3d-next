import React, { useState, useRef, useEffect } from "react";
import styles from "./TripoLayout.module.css";
import Image from "next/image";
import WorkbenchHeader from "@/components/WorkbenchHeader";

const TripoLayout = ({ children }: { children: React.ReactNode }) => {
  const [panelWidth, setPanelWidth] = useState(280);
  const [bottomHeight, setBottomHeight] = useState(180);
  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);
  const isDraggingBottom = useRef(false);
  const startY = useRef(0);
  const startX = useRef(0);
  const startSize = useRef(0);

  const [activeTab, setActiveTab] = useState<"image" | "model" | "animation">(
    "image",
  );

  const [imageForm, setImageForm] = useState({
    model: "gpt_image_2", // 默认选中GPT Image 2
    prompt: "",
    aspectRatio: "1:1",
    imageCount: 4,
    style: "none",
    fontSize: "10px",
    pose: "无",
    multiView: false,
  });

  const [modalForm, setModalForm] = useState({
    name: "",
    modeType: "标准",
    aiModel: "Meshy 6",
    imageEnhance: true,
    multiView: false,
  });

  const [actionForm, setActionForm] = useState({
    search: "",
    selectAnim: "",
  });

  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  // 完整模型列表（和截图完全一致）
  const modelList = [
    {
      value: "gpt_image_2",
      label: "GPT Image 2",
      icon: "🔵",
      isPro: false,
    },
    {
      value: "nano_banana_pro",
      label: "Nano Banana Pro",
      icon: "🟡",
      isPro: true,
    },
    {
      value: "nano_banana_2",
      label: "Nano Banana 2",
      icon: "🟠",
      isPro: false,
    },
    {
      value: "nano_banana",
      label: "Nano Banana",
      icon: "🟣",
      isPro: false,
    },
  ];

  // 其他选项列表
  const ratioList = ["1:1", "16:9", "9:16", "4:3", "3:4"];
  const countList = [1, 2, 3, 4];
  const poseList = ["无", "A 姿势", "T 姿势"];
  const styleList = ["无", "写实", "动漫", "科幻"];
  const [styleShow, setStyleShow] = useState(false); // 左侧拖拽（改宽度，用 clientX）
  const handleLeftMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingLeft.current = true;
    startX.current = e.clientX;
    startSize.current = panelWidth;
    document.addEventListener("mousemove", handleLeftMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleLeftMouseMove = (e: MouseEvent) => {
    if (!isDraggingLeft.current) return;
    const deltaX = e.clientX - startX.current;
    const newWidth = Math.max(200, Math.min(400, startSize.current + deltaX));
    setPanelWidth(newWidth);
  };

  // 右侧拖拽（左侧把手：向左拖加宽）
  const handleRightMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRight.current = true;
    startX.current = e.clientX;
    startSize.current = panelWidth;
    document.addEventListener("mousemove", handleRightMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleRightMouseMove = (e: MouseEvent) => {
    if (!isDraggingRight.current) return;
    const deltaX = e.clientX - startX.current;
    const newWidth = Math.max(200, Math.min(400, startSize.current - deltaX));
    setPanelWidth(newWidth);
  };

  // 底部拖拽
  const handleBottomMouseDown = (e: React.MouseEvent) => {
    isDraggingBottom.current = true;
    startY.current = e.clientY;
    startSize.current = bottomHeight;
    document.addEventListener("mousemove", handleBottomMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleBottomMouseMove = (e: MouseEvent) => {
    if (!isDraggingBottom.current) return;
    const deltaY = e.clientY - startY.current;
    const newHeight = Math.max(120, Math.min(320, startSize.current + deltaY));
    setBottomHeight(newHeight);
  };

  // 结束拖拽
  const handleMouseUp = () => {
    isDraggingLeft.current = false;
    isDraggingRight.current = false;
    isDraggingBottom.current = false;
    document.removeEventListener("mousemove", handleLeftMouseMove);
    document.removeEventListener("mousemove", handleRightMouseMove);
    document.removeEventListener("mousemove", handleBottomMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleLeftMouseMove);
      document.removeEventListener("mousemove", handleRightMouseMove);
      document.removeEventListener("mousemove", handleBottomMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className={styles.layoutWrapper}>
      <WorkbenchHeader />
      {/* 主体：画布全屏铺底，左右与底部栏绝对定位悬浮在上层 */}
      <div className={styles.bodyContent}>
        <main className={styles.canvas}>{children}</main>

        <aside className={styles.sidebarWrapper}>
          {/* 1. 左侧竖向导航栏 */}
          <div className={styles.navColumn}>
            <div
              className={`${styles.navItem} ${activeTab === "image" ? styles.navItemActive : ""}`}
              onClick={() => setActiveTab("image")}
            >
              <span className={styles.navIcon}>🖼️</span>
              <span className={styles.navText}>图像</span>
            </div>
            <div
              className={`${styles.navItem} ${activeTab === "model" ? styles.navItemActive : ""}`}
              onClick={() => setActiveTab("model")}
            >
              <span className={styles.navIcon}>🧊</span>
              <span className={styles.navText}>模型</span>
            </div>
            <div
              className={`${styles.navItem} ${activeTab === "animation" ? styles.navItemActive : ""}`}
              onClick={() => setActiveTab("animation")}
            >
              <span className={styles.navIcon}>🏃</span>
              <span className={styles.navText}>动画</span>
            </div>
          </div>
          {/* 2. 右侧常驻详情面板 */}
          <div className={styles.contentPanel}>
            {/* ========== 图像面板 完整复刻 ========== */}
            {activeTab === "image" && (
              <div className={styles.panelContainer}>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>人工智能模型</p>

                  {/* 下拉顶部收起按钮 */}
                  <div
                    className={styles.modelDropdown}
                    onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      background: "#222",
                      cursor: "pointer",
                    }}
                  >
                    {/* 当前选中模型图标+名称 */}
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                        background: "linear-gradient(135deg,#4facfe,#00f2fe)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                      }}
                    >
                      {modelList.find((m) => m.value === imageForm.model)?.icon}
                    </div>
                    <span style={{ fontSize: "15px", color: "#fff", flex: 1 }}>
                      {
                        modelList.find((m) => m.value === imageForm.model)
                          ?.label
                      }
                    </span>
                    {/* 上下展开箭头 */}
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#aaa",
                        // 核心：让箭头在span内垂直居中
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // 移除错误的 marginRight: "100px,"（这个样式会把箭头推偏）
                        // 如果需要和右侧保持间距，可以加 marginLeft: "auto" 让箭头靠右居中
                        marginLeft: "auto",
                        marginRight: "18px", // 微调右侧边距
                      }}
                    >
                      {modelDropdownOpen ? "⌃" : "⌄"}
                    </span>
                  </div>

                  {/* 下拉展开选项列表 和截图1:1 */}
                  {modelDropdownOpen && (
                    <div
                      style={{
                        position: "absolute", // 核心：绝对定位，脱离文档流
                        top: "100%", // 紧贴父容器底部
                        left: 0,
                        right: 0,
                        marginTop: "4px", // 与顶部栏的间距
                        background: "#2a2a2a",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #333",
                        zIndex: 999, // 极高层级，确保覆盖所有下方元素
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)", // 加阴影更有悬浮感（可选）
                      }}
                    >
                      {modelList.map((item) => (
                        <div
                          key={item.value}
                          onClick={() => {
                            setImageForm((prev) => ({
                              ...prev,
                              model: item.value,
                            }));
                            setModelDropdownOpen(false);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "10px 14px",
                            cursor: "pointer",
                            background:
                              imageForm.model === item.value
                                ? "#2b2b2b"
                                : "transparent",
                          }}
                        >
                          {/* 模型图标 */}
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "8px",
                              background:
                                item.value === "gpt_image_2"
                                  ? "linear-gradient(135deg,#4facfe,#00f2fe)"
                                  : item.value === "nano_banana_pro"
                                    ? "#f7c948"
                                    : item.value === "nano_banana_2"
                                      ? "#ff9a3c"
                                      : "#b565e7",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "18px",
                            }}
                          >
                            🍌
                          </div>

                          {/* 模型名称+PRO标 */}
                          <div style={{ flex: 1 }}>
                            <span style={{ color: "#fff", fontSize: "16px" }}>
                              {item.label}
                            </span>
                            {item.isPro && (
                              <span
                                style={{
                                  background: "#794cff",
                                  fontSize: "12px",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  marginLeft: "6px",
                                }}
                              >
                                PRO
                              </span>
                            )}
                          </div>

                          {/* 选中后右侧白色对勾 ✅ */}
                          {imageForm.model === item.value && (
                            <span style={{ color: "#fff", fontSize: "18px" }}>
                              ✓
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>提示</p>
                  <textarea
                    className={styles.textareaPrompt}
                    placeholder="描述您想生成的图像。您可以使用您的母语，例如，一只可爱的小狗"
                    maxLength={800}
                    value={imageForm.prompt}
                    onChange={(e) =>
                      setImageForm({ ...imageForm, prompt: e.target.value })
                    }
                  />
                  <div className={styles.charCount}>
                    {imageForm.prompt.length}/800
                  </div>
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>纵横比</p>
                  <div className={styles.buttonRow}>
                    {ratioList.map((item) => (
                      <button
                        key={item}
                        className={`${styles.tagBtn} ${imageForm.aspectRatio === item ? styles.tagActive : ""}`}
                        onClick={() =>
                          setImageForm({ ...imageForm, aspectRatio: item })
                        }
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>图像数量</p>
                  <div className={styles.buttonRow}>
                    {countList.map((item) => (
                      <button
                        key={item}
                        className={`${styles.tagBtn} ${imageForm.imageCount === item ? styles.tagActive : ""}`}
                        onClick={() =>
                          setImageForm({ ...imageForm, imageCount: item })
                        }
                      >
                        {item}
                      </button>
                    ))}
                    <button className={styles.tagBtn}>⌄</button>
                  </div>
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>风格化</p>
                  <div
                    className={styles.styleSelect}
                    onClick={() => setStyleShow(!styleShow)}
                  >
                    <span>🚫 {imageForm.style}</span>
                    <span className={styles.settingIcon}>⛭</span>
                  </div>
                  {styleShow && (
                    <div
                      style={{
                        background: "#222",
                        padding: 8,
                        borderRadius: 6,
                      }}
                    >
                      {styleList.map((item) => (
                        <div
                          key={item}
                          style={{ padding: "6px 0", cursor: "pointer" }}
                          onClick={() => {
                            setImageForm({ ...imageForm, style: item });
                            setStyleShow(false);
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.switchItem}>
                  <span>多视图</span>
                  <input
                    type="checkbox"
                    className={styles.toggleSwitch}
                    checked={imageForm.multiView}
                    onChange={(e) =>
                      setImageForm({
                        ...imageForm,
                        multiView: e.target.checked,
                      })
                    }
                  />
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>姿势</p>
                  <div className={styles.buttonRow}>
                    {poseList.map((item) => (
                      <button
                        key={item}
                        className={`${styles.tagBtn} ${imageForm.pose === item ? styles.tagActive : ""}`}
                        onClick={() =>
                          setImageForm({ ...imageForm, pose: item })
                        }
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.bottomMeta}>
                  <span>15秒</span>
                  <span>💰 6 × 4 = 24</span>
                </div>
                <button className={styles.generateBtn}>✨ 生成</button>
              </div>
            )}
            {/* ========== 模型面板 ========== */}
            {activeTab === "model" && (
              <div className={styles.panelContainer}>
                <p className={styles.panelTitle}>图像</p>
                <div className={styles.uploadBox}>
                  <div className={styles.uploadIcon}>⬆️</div>
                  <p>点击/拖放/粘贴图像</p>
                  <p className={styles.uploadTip}>
                    支持的格式：.png,.jpg,.jpeg,.webp <br />
                    最大大小：20MB
                  </p>
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>名称 ⓘ</p>
                  <input
                    className={styles.normalInput}
                    placeholder="为你的生成命名"
                    value={modalForm.name}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, name: e.target.value })
                    }
                  />
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>模式类型 ⓘ</p>
                  <div className={styles.buttonRow}>
                    <button
                      className={`${styles.tagBtn} ${modalForm.modeType === "标准" ? styles.tagActive : ""}`}
                      onClick={() =>
                        setModalForm({ ...modalForm, modeType: "标准" })
                      }
                    >
                      标准
                    </button>
                    <button
                      className={styles.tagBtn}
                      onClick={() =>
                        setModalForm({ ...modalForm, modeType: "低模 (Beta)" })
                      }
                    >
                      低模 (Beta)
                    </button>
                  </div>
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>人工智能模型</p>
                  <div className={styles.modelDropdown}>
                    {modalForm.aiModel}
                  </div>
                </div>
                <div className={styles.switchItem}>
                  <span>图像增强 ⓘ</span>
                  <input
                    type="checkbox"
                    checked={modalForm.imageEnhance}
                    className={styles.toggleSwitch}
                    onChange={(e) =>
                      setModalForm({
                        ...modalForm,
                        imageEnhance: e.target.checked,
                      })
                    }
                  />
                </div>
                <div className={styles.switchItem}>
                  <span>多视图 (Beta) 👑</span>
                  <input
                    type="checkbox"
                    className={styles.toggleSwitch}
                    checked={modalForm.multiView}
                    onChange={(e) =>
                      setModalForm({
                        ...modalForm,
                        multiView: e.target.checked,
                      })
                    }
                  />
                </div>
                <div className={styles.bottomMeta}>
                  <span>1分钟</span>
                  <span>💰 20</span>
                </div>
                <button className={styles.generateBtn}>✨ 生成</button>
              </div>
            )}
            {/* ========== 动画面板 ========== */}
            {activeTab === "animation" && (
              <div className={styles.panelContainer}>
                <input
                  className={styles.searchInput}
                  placeholder="🔍 搜索动画"
                  value={actionForm.search}
                  onChange={(e) =>
                    setActionForm({ ...actionForm, search: e.target.value })
                  }
                />
                <p className={styles.sectionTitle}>📶 库</p>
                <div className={styles.animTopBar}>
                  <span className={styles.boldText}>💡 骨骼绑定模型</span>
                  <button className={styles.boneBtn}>⛓️ 绑定骨骼</button>
                </div>
                <div className={styles.animGrid}>
                  <div className={styles.animCard}>
                    <div className={styles.animPreview}>⚔️</div>
                    <p>三连击</p>
                  </div>
                  <div className={styles.animCard}>
                    <div className={styles.animPreview}>🤝</div>
                    <p>同意手势</p>
                  </div>
                  <div className={styles.animCard}>
                    <div className={styles.animPreview}>🚶‍♀️</div>
                    <p>女性步行</p>
                  </div>
                  <div className={styles.animCard}>
                    <div className={styles.animPreview}>💃</div>
                    <p>尽情舞蹈</p>
                  </div>
                  <div className={styles.animCard}>
                    <div className={styles.animPreview}>🏃</div>
                    <p>快跑</p>
                  </div>
                  <div className={styles.animCard}>
                    <div className={styles.animPreview}>🦸</div>
                    <p>技能 1</p>
                  </div>
                  <div className={styles.animCard}>
                    <div className={styles.animPreview}>🤸</div>
                    <p>技能 3</p>
                  </div>
                  <div className={styles.animCard}>
                    <div className={styles.animPreview}>🥊</div>
                    <p>拳击练习</p>
                  </div>
                  <div className={styles.animCard}>
                    <div className={styles.animPreview}>👊</div>
                    <p>攻击</p>
                  </div>
                  <div className={styles.animCard}>
                    <div className={styles.animPreview}>🚶</div>
                    <p>步行</p>
                  </div>
                  <div className={styles.animCard}>
                    <div className={styles.animPreview}>💀</div>
                    <p>死亡</p>
                  </div>
                  <div className={styles.animCard}>
                    <div className={styles.animPreview}>🧍</div>
                    <p>空闲</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        <aside
          className={styles.sidebarRight}
          style={{ width: `${panelWidth}px` }}
        >
          <div className={styles.topnav}>资产</div>
          <div className={styles.upgrade}>
            <span className={styles.upgradeText}>
              升级即可解锁无限模型下载、
              <br />
              Ultra模型生成及更多高级功能，
              <br />
              最高5折优惠
            </span>
            <button className={styles.upBtn}>升级</button>
          </div>
          <div className={styles.navWrap}>
            <div className={styles.btnGroup}>
              {/* 四宫格换成自己的图片 */}
              <div className={styles.iconBtn}>
                <img
                  src="/image/sgg.png"
                  alt=""
                  style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    width: 31,
                    height: 31,
                  }}
                />
              </div>

              <div className={styles.iconBtn}>
                <img src="/image/Gc_115_face-Star.png" alt="" />
              </div>
            </div>

            <div className={styles.singleBtn}>
              <img src="/image/sl.png" alt="" />
            </div>

            <div className={styles.manageBtn}>
              <img src="/image/gli.png" alt="" />
              <span>管理</span>
            </div>
          </div>
          <div className={styles.gridContainer}>
            <div className={styles.modelon}>
              <button>
                <img
                  src="/image/up.png"
                  alt=""
                  style={{ width: 15, height: 15 }}
                />
              </button>
              <p>上传3D模型</p>
              <span>
                OBJ、FBX、STL、
                <br />
                GLB <br />
                大小≤150MB
              </span>
            </div>
            <div className={styles.modelone}>
              <img src="/image/1 (1).png" alt="" />
              <button>i</button>
            </div>
            <div className={styles.modelone}>
              <img src="/image/1 (2).png" alt="" />
              <button>i</button>
            </div>
            <div className={styles.modelone}>
              <img src="/image/1 (3).png" alt="" />
              <button>i</button>
            </div>
            <div className={styles.modelone}>
              <img src="/image/1 (4).png" alt="" />
              <button>i</button>
            </div>
            <div className={styles.modelone}>
              <img src="/image/1 (5).png" alt="" />
              <button>i</button>
            </div>
            <div className={styles.modelone}>
              <img src="/image/1 (6).png" alt="" />
              <button>i</button>
            </div>
            <div className={styles.modelone}>
              <img src="/image/1 (7).png" alt="" />
              <button>i</button>
            </div>
          </div>

          <div
            className={styles.resizeHandle}
            onMouseDown={handleRightMouseDown}
          />
        </aside>

        <footer
          className={styles.bottomBar}
          style={{ minHeight: `${bottomHeight}px` }}
        >
          {/* 上半部分：材质/画笔选择栏 */}
          <div className={styles.brushBar}>
            <div className={`${styles.brushItem} ${styles.brushWhite}`}></div>
            <div
              className={`${styles.brushItem} ${styles.brushMetal} ${styles.active}`}
            ></div>
            <div className={`${styles.brushItem} ${styles.brushSetting}`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              >
                <path d="M7 8h10M7 12h4m1 0h4M7 16h6" />
              </svg>
            </div>
            <div className={`${styles.brushItem} ${styles.brushGray}`}></div>
            <div
              className={`${styles.brushItem} ${styles.brushColorful}`}
            ></div>
            <div className={`${styles.brushItem} ${styles.brushGold}`}></div>
            <div className={`${styles.brushItem} ${styles.brushSilver}`}></div>
            <div className={`${styles.brushItem} ${styles.brushCyan}`}></div>
          </div>

          {/* 下半部分：功能按钮栏 */}
          <div className={styles.actionBar}>
            <div className={styles.actionLeft}>
              <button className={styles.actionBtn} title="撤销">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button className={styles.actionBtn} title="重做">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                className={`${styles.actionBtn} ${styles.retryBtn}`}
                title="免费重试"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                >
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                <span>免费重试</span>
              </button>
              <button className={styles.actionBtn} title="礼物">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                >
                  <path d="M20 12v10H4V12M2 7h20v5H2V7z" />
                  <path d="M12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              </button>
              <button className={styles.actionBtn} title="星球">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </button>
              <button
                className={`${styles.actionBtn} ${styles.printBtn}`}
                title="3D打印"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                >
                  <path d="M19 11V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6M3 11h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-10z" />
                  <path d="M12 19v-6" />
                </svg>
                <span>3D打印</span>
                <span className={styles.newTag}>New</span>
              </button>
              <button className={styles.actionBtn} title="收藏">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
              <button className={styles.actionBtn} title="分享">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v12" />
                </svg>
                <span className={styles.score}>+300</span>
              </button>
            </div>
            <button className={styles.exportBtn} title="导出">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              <span>导出</span>
            </button>
          </div>

          {/* 拖拽把手（保留你原有的逻辑） */}
          <div
            className={styles.resizeHandleBottom}
            onMouseDown={handleBottomMouseDown}
          />
        </footer>
      </div>
    </div>
  );
};

export default TripoLayout;
