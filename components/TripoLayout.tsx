import React, { useState, useRef, useEffect } from "react";
import styles from "./TripoLayout.module.css";
import Image from "next/image";

// antd 核心组件
import { Popover, Modal } from "antd";

import {
  UserOutlined,
  ApiOutlined,
  AppstoreAddOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const TripoLayout = ({ children }: { children: React.ReactNode }) => {
  const [panelWidth, setPanelWidth] = useState(280);
  const [bottomHeight, setBottomHeight] = useState(180);
  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);
  const isDraggingBottom = useRef(false);
  const startY = useRef(0);
  const startX = useRef(0);
  const startSize = useRef(0);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"image" | "model" | "animation">(
    "image",
  );

  // 左侧拖拽（改宽度，用 clientX）
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
  {
    /* 鼠标移入弹出气泡菜单（Popover实现） */
  }
  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        backgroundColor: "#26292C",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          color: "#F2F2F2",
        }}
        onClick={() => setOpen(true)}
      >
        <UserOutlined />
        <span>个人信息</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          color: "#F2F2F2",
        }}
      >
        <ApiOutlined />
        <span>API</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          color: "#F2F2F2",
        }}
      >
        <AppstoreAddOutlined />
        <span>插件</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          color: "#F2F2F2",
        }}
      >
        <MessageOutlined />
        <span>联系我们</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          color: "#F2F2F2",
        }}
      >
        <LogoutOutlined />
        <span>登出</span>
      </div>
    </div>
  );

  return (
    <div className={styles.layoutWrapper}>
      {/* 顶部导航栏（通顶） */}
      <header className={styles.topNav}>
        <div className={styles.navLeft}>
          <div className={styles.logo}>Vexo</div>
          <nav className={styles.navMenu}>
            <a className={styles.navItemActive}>3D 工作台</a>
            <a className={styles.navItem}>首页</a>
            <a className={styles.navItem}>资产</a>
            <a className={styles.navItem}>推广计划</a>
          </nav>
        </div>
        <div className={styles.navRight}>
          <button className={styles.navBtn}>DCC Bridge</button>
          <div className={styles.userInfo}>
            <Image src="/image/sd.png" alt="avatar" width={25} height={25} />
            <span>280</span>
            <button className={styles.upgradeBtn}>
              <Image src="/image/xhj.png" alt="avatar" width={25} height={25} />
              升级
            </button>
            <Image src="/image/ld.png" alt="avatar" width={22} height={22} />
            <Image src="/image/dq.png" alt="avatar" width={22} height={22} />
            {/* 鼠标移入弹出气泡 */}
            <Popover content={content} trigger="hover" placement="bottomRight">
              <Image
                src="/image/grxx.png"
                width={22}
                height={22}
                style={{ cursor: "pointer", borderRadius: 8 }}
                alt="个人中心"
              />
            </Popover>

            <Modal
              open={open}
              onCancel={() => setOpen(false)}
              title="用户头像"
              width={1000}
              footer={null}
              className={styles.userModal}
              bodyStyle={{
                height: "600px",
                overflow: "auto",
                backgroundColor: "#101115",
              }}
            >
              <div className={styles.modalBody}>
                {/* 圆形头像 */}
                <div className={styles.avatarCircle}>
                  <UserOutlined style={{ fontSize: 48, color: "#fff" }} />
                </div>

                {/* 用户名 */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>用户头像</label>
                  <div className={styles.inputWrapper}>
                    <input
                      defaultValue="请输入用户名"
                      className={styles.formInput}
                    />
                    <span className={styles.editIcon}>✎</span>
                  </div>
                </div>

                {/* 邮箱 */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>邮箱</label>
                  <input
                    defaultValue="请输入邮箱"
                    className={styles.formInput}
                  />
                </div>

                {/* 按钮 */}
                <div className={styles.buttonGroup}>
                  <button className={styles.btnCancel}>取消</button>
                  <button className={styles.btnSave}>保存更改</button>
                </div>

                {/* 重置密码 */}
                <div className={styles.resetPasswordLink}>设置/重置密码</div>
              </div>
            </Modal>
          </div>
        </div>
      </header>

      {/* 主体：画布全屏铺底，左右与底部栏绝对定位悬浮在上层 */}
      <div className={styles.bodyContent}>
        <main className={styles.canvas}>{children}</main>

        {/* 最外层大aside 包裹整个侧边栏 */}
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
                  <div className={styles.modelDropdown}>
                    <div className={styles.modelLogo}>🍌2</div>
                    <span>Nano Banana 2</span>
                    <span className={styles.dropdownArrow}>⌄</span>
                  </div>
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>提示</p>
                  <textarea
                    className={styles.textareaPrompt}
                    placeholder="描述您想生成的图像。您可以使用您的母语，例如，一只可爱的小狗"
                    maxLength={800}
                  />
                  <div className={styles.charCount}>0/800</div>
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>纵横比</p>
                  <div className={styles.buttonRow}>
                    <button className={`${styles.tagBtn} ${styles.tagActive}`}>
                      1:1
                    </button>
                    <button className={styles.tagBtn}>16:9</button>
                    <button className={styles.tagBtn}>9:16</button>
                    <button className={styles.tagBtn}>4:3</button>
                    <button className={styles.tagBtn}>3:4</button>
                  </div>
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>图像数量</p>
                  <div className={styles.buttonRow}>
                    <button className={styles.tagBtn}>1</button>
                    <button className={styles.tagBtn}>2</button>
                    <button className={styles.tagBtn}>3</button>
                    <button className={`${styles.tagBtn} ${styles.tagActive}`}>
                      4
                    </button>
                    <button className={styles.tagBtn}>⌄</button>
                  </div>
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>风格化</p>
                  <div className={styles.styleSelect}>
                    <span>🚫 无</span>
                    <span className={styles.settingIcon}>⛭</span>
                  </div>
                </div>
                <div className={styles.switchItem}>
                  <span>多视图</span>
                  <input type="checkbox" className={styles.toggleSwitch} />
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>姿势</p>
                  <div className={styles.buttonRow}>
                    <button className={`${styles.tagBtn} ${styles.tagActive}`}>
                      无
                    </button>
                    <button className={styles.tagBtn}>A 姿势</button>
                    <button className={styles.tagBtn}>T 姿势</button>
                  </div>
                </div>
                <div className={styles.bottomMeta}>
                  <span>15秒</span>
                  <span>💰 6 × 4 = 24</span>
                </div>
                <button className={styles.generateBtn}>✨ 生成</button>
              </div>
            )}
            {/* ========== 模型面板 完整复刻 ========== */}
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
                  />
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>模式类型 ⓘ</p>
                  <div className={styles.buttonRow}>
                    <button className={`${styles.tagBtn} ${styles.tagActive}`}>
                      标准
                    </button>
                    <button className={styles.tagBtn}>低模 (Beta)</button>
                  </div>
                </div>
                <div className={styles.panelBlock}>
                  <p className={styles.panelTitle}>人工智能模型</p>
                  <div className={styles.modelDropdown}>Meshy 6 ⌄</div>
                </div>
                <div className={styles.switchItem}>
                  <span>图像增强 ⓘ</span>
                  <input
                    type="checkbox"
                    checked
                    className={styles.toggleSwitch}
                  />
                </div>
                <div className={styles.switchItem}>
                  <span>多视图 (Beta) 👑</span>
                  <input type="checkbox" className={styles.toggleSwitch} />
                </div>
                <div className={styles.bottomMeta}>
                  <span>1分钟</span>
                  <span>💰 20</span>
                </div>
                <button className={styles.generateBtn}>✨ 生成</button>
              </div>
            )}
            {/* ========== 动画面板 完整复刻 ========== */}
            {activeTab === "animation" && (
              <div className={styles.panelContainer}>
                <input
                  className={styles.searchInput}
                  placeholder="🔍 搜索动画"
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
          <div>右侧面板</div>
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
