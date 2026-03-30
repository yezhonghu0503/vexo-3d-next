import React from "react";
import styles from "./LeftPanel.module.css";

const LeftPanel = () => {
  return (
    <div className={styles["left-panel"]}>
      <h3 className={styles["title"]}>生成模型</h3>

      <div className={styles["section"]}>
        <label className={styles["label"]}>模型类型</label>
        <div className={styles["tabs"]}>
          <button className={styles["tab-active"]}>高精度模型</button>
          <button className={styles["tab"]}>智能网格</button>
        </div>
      </div>

      <div className={styles["section"]}>
        <label className={styles["label"]}>几何精度</label>
        <div className={styles["radio-group"]}>
          <label className={styles["radio"]}>
            <input type="radio" name="precision" defaultChecked />
            标准
          </label>
          <label className={styles["radio"]}>
            <input type="radio" name="precision" />
            超清
          </label>
        </div>
      </div>

      <button className={styles["generate-btn"]}>生成模型</button>
    </div>
  );
};

export default LeftPanel;
