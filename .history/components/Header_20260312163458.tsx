"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Box, HelpCircle, Layers } from "lucide-react";
import styles from "./Header.module.css";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const isWorkbench = pathname === "/workbench";

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
          <Button className={styles.signupButton} onClick={handleSignUpClick}>
            Sign Up
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
