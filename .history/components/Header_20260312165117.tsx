"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Box, HelpCircle, Layers } from "lucide-react";
import styles from "./Header.module.css";
import { useState } from "react";
import LoginPop from "@/components/ui/LoginPop";

const Header = () => {
  const pathname = usePathname();
  const isWorkbench = pathname === "/workbench";
  const [showLogin, setShowLogin] = useState(false);
  // 控制弹窗显示/隐藏的状态
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 点击 signup 按钮打开弹窗
  const handleSignupClick = () => {
    setIsModalVisible(true);
  };

  // 关闭弹窗
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

          <Link
            href="/login"
            className={styles.loginLink}
            onClick={handleSignupClick}
          >
            Sign In
          </Link>
          <Button className={styles.signupButton}>Sign Up</Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
