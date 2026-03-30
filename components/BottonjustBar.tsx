import React from "react";
import styles from "./BottonjustBar.module.css";

const BottonjustBar = () => {
  return (
    <div className={styles["bottom-bar"]}>
      <div className={styles["left-actions"]}>
        <button className={styles["btn"]}>撤销</button>
        <button className={styles["btn"]}>重做</button>
      </div>
      <div className={styles["center-actions"]}>
        <button className={styles["btn"]}>视图</button>
        <button className={styles["btn"]}>3D打印</button>
      </div>
      <div className={styles["right-actions"]}>
        <button className={styles["btn-primary"]}>导出</button>
      </div>
    </div>
  );
};

export default BottonjustBar;
