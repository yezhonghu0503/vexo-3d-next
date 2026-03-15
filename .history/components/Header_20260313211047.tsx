"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Box, HelpCircle, Layers } from "lucide-react";
import styles from "./Header.module.css";
import { useState } from "react";
// 引入登录弹窗组件
import LoginPop from "@/components/ui/LoginPop";

const Header = () => {
  const pathname = usePathname();
  const isWorkbench = pathname === "/workbench";
  // 控制登录弹窗显示/隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSignupClick = () => {
    console.log("点击了 signup 按钮！当前状态：", isModalVisible);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <header data-cmp="Header" className={styles.header}>
      <div className={styles.container}>
        {/* Logo Area */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Box size={20} strokeWidth={2.5} />
          </div>
          <span className={styles.logoText}>Vexo</span>
        </Link>

        {/* Navigation */}
        <nav className={styles.nav}>
          <Link href="/workbench">
            <Button
              variant="ghost"
              className={`${styles.navButton} ${isWorkbench ? styles.navButtonActive : ""}`}
            >
              <Layers
                className={`${styles.navIcon} ${isWorkbench ? styles.navIconActive : styles.navIconInactive}`}
              />
              <span
                className={
                  isWorkbench ? styles.navTextGradient : styles.navText
                }
              >
                Workbench
              </span>
              {isWorkbench && <span className={styles.navIndicator} />}
            </Button>
          </Link>

          <Button variant="ghost" className={styles.helpButton}>
            <HelpCircle className={styles.helpIcon} />
            Help Center
          </Button>

          <div className={styles.separator} />

          <Link href="/login" className={styles.loginLink}>
            Sign In
          </Link>

          <Button className={styles.signupButton} onClick={handleSignupClick}>
            Sign Up
          </Button>
        </nav>
      </div>

      {/* ✅ 关键：把 LoginPop 组件渲染在这里 */}
      <LoginPop visible={isModalVisible} onClose={handleCloseModal} />
    </header>
  );
};

export default Header;
