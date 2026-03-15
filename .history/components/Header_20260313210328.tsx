"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Box, HelpCircle, Layers } from "lucide-react";
import styles from "./Header.module.css";
import { useState } from "react";
import LoginPop from "@/components/ui/LoginPop";
function Headers() {
  // 状态直接写在 Header 里！不需要父组件！
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header>
      <button onClick={() => setShowLogin(true)}>signup</button>

      {/* 弹窗直接放在这里 */}
      <LoginPop visible={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
}
const Header = () => {
  const pathname = usePathname();
  const isWorkbench = pathname === "/workbench";
  const [showLogin, setShowLogin] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
