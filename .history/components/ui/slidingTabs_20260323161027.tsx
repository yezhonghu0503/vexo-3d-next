// slidingTabs.tsx
import { FC, useState } from "react";
import styles from "./slidingTabs.module.css";

interface SlidingTabsProps {
  tabs: string[];
  defaultActive?: number;
  onTabChange?: (index: number) => void;
}

const SlidingTabs: FC<SlidingTabsProps> = ({
  tabs,
  defaultActive = 0,
  onTabChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onTabChange?.(index);
  };

  return (
    <div className={styles.tabContainer}>
      {/* 滑动背景 */}
      <div
        className={styles.slider}
        style={{
          left: `${(activeIndex * 100) / tabs.length}%`,
          width: `${100 / tabs.length}%`,
        }}
      />
      {/* 选项列表 */}
      <div className={styles.tabList}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${styles.tabItem} ${
              activeIndex === index ? styles.activeTab : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingTabs;
