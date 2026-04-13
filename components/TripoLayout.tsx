import React, { useState, useRef, useEffect } from "react";
import styles from "./TripoLayout.module.css";

const TripoLayout = ({ children }: { children: React.ReactNode }) => {
  const [panelWidth, setPanelWidth] = useState(280);
  const [bottomHeight, setBottomHeight] = useState(180);

  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);
  const isDraggingBottom = useRef(false);
  const startY = useRef(0);
  const startX = useRef(0);
  const startSize = useRef(0);

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
            <span>280</span>
            <button className={styles.upgradeBtn}>升级</button>
            <div className={styles.avatar}>17</div>
          </div>
        </div>
      </header>

      {/* 主体：画布全屏铺底，左右与底部栏绝对定位悬浮在上层 */}
      <div className={styles.bodyContent}>
        <main className={styles.canvas}>{children}</main>

        <aside
          className={styles.sidebarLeft}
          style={{ width: `${panelWidth}px` }}
        >
          <div>左侧面板</div>
          <div
            className={styles.resizeHandle}
            onMouseDown={handleLeftMouseDown}
          />
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
              <div
                className={`${styles.brushItem} ${styles.brushSilver}`}
              ></div>
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
