import React from "react";
import styles from "./RightManager.module.css";

const RightManager = () => {
  const assets = [
    { id: 1, name: "废墟场景 1", thumb: "🗿" },
    { id: 2, name: "废墟场景 2", thumb: "🗿" },
    { id: 3, name: "废墟场景 3", thumb: "🗿" },
  ];

  return (
    <div className={styles["right-manager"]}>
      <h3 className={styles["title"]}>资产</h3>
      <div className={styles["asset-grid"]}>
        {assets.map((asset) => (
          <div key={asset.id} className={styles["asset-card"]}>
            <div className={styles["thumb"]}>{asset.thumb}</div>
            <div className={styles["name"]}>{asset.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightManager;
