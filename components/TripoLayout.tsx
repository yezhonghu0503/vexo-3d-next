import React, { useState, useRef, useEffect } from "react";
import styles from "./TripoLayout.module.css";

const TripoLayout = ({ children }: { children: React.ReactNode }) => {
  const [panelWidth, setPanelWidth] = useState(280);
  const [bottomHeight, setBottomHeight] = useState(60);

  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);
  const isDraggingBottom = useRef(false);
  const startY = useRef(0);
  const startSize = useRef(0);

  // 左侧拖拽
  const handleLeftMouseDown = (e: React.MouseEvent) => {
    isDraggingLeft.current = true;
    startY.current = e.clientY;
    startSize.current = panelWidth;
    document.addEventListener("mousemove", handleLeftMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleLeftMouseMove = (e: MouseEvent) => {
    if (!isDraggingLeft.current) return;
    const deltaY = e.clientY - startY.current;
    const newWidth = Math.max(200, Math.min(400, startSize.current + deltaY));
    setPanelWidth(newWidth);
  };

  // 右侧拖拽
  const handleRightMouseDown = (e: React.MouseEvent) => {
    isDraggingRight.current = true;
    startY.current = e.clientY;
    startSize.current = panelWidth;
    document.addEventListener("mousemove", handleRightMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleRightMouseMove = (e: MouseEvent) => {
    if (!isDraggingRight.current) return;
    const deltaY = e.clientY - startY.current;
    const newWidth = Math.max(200, Math.min(400, startSize.current + deltaY));
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
    const newHeight = Math.max(40, Math.min(100, startSize.current + deltaY));
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
          <div className={styles.logo}>TRIPO</div>
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

      {/* 主体内容：左 + 中 + 右 */}
      <div className={styles.bodyContent}>
        {/* 左侧栏 */}
        <aside
          className={styles.sidebarLeft}
          style={{ width: `${panelWidth}px` }}
        >
          <div>左侧面板</div>
          <div
            className={styles.resizeHandle}
            onMouseDown={handleLeftMouseDown}
            style={{ right: -3, top: 0, bottom: 0, cursor: "ew-resize" }}
          />
        </aside>

        {/* 中间：画布 + 底部 */}
        <div className={styles.middle}>
          <main className={styles.canvas}>{children}</main>
          <footer
            className={styles.bottomBar}
            style={{ height: `${bottomHeight}px` }}
          >
            <div className={styles.bottomLeft}>
              <button className={styles.footerBtn}>撤销</button>
              <button className={styles.footerBtn}>重做</button>
              <button className={styles.footerBtn}>免费重试</button>
            </div>
            <div className={styles.bottomCenter}>
              <span className={styles.viewDot}></span>
              <span className={styles.viewDotActive}></span>
              <span className={styles.viewIcon}>⛶</span>
            </div>
            <div className={styles.bottomRight}>
              <button className={styles.exportBtn}>导出</button>
            </div>
            <div
              className={styles.resizeHandle}
              onMouseDown={handleBottomMouseDown}
              style={{ top: -3, left: 0, right: 0, cursor: "ns-resize" }}
            />
          </footer>
        </div>

        {/* 右侧栏 */}
        <aside
          className={styles.sidebarRight}
          style={{ width: `${panelWidth}px` }}
        >
          <div>右侧面板</div>
          <div
            className={styles.resizeHandle}
            onMouseDown={handleRightMouseDown}
            style={{ left: -3, top: 0, bottom: 0, cursor: "ew-resize" }}
          />
        </aside>
      </div>
    </div>
  );
};

export default TripoLayout;
