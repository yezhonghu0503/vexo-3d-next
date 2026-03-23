"use client";

import Header from "@/components/Header";
import styles from "./page.module.css";

export default function Workbench() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main} />
    </div>
  );
}
