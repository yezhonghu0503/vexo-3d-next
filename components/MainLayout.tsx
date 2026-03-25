// components/MainLayout.tsx
import React from "react";
import LeftPanel from "./LeftPanel";
import BottonjustBar from "./BottonjustBar";
import RightManager from "./RightManager";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* 左侧生成面板 */}
      <LeftPanel />

      {/* 中间区域：3D预览 + 底部控制栏 */}
      <div className="flex-1 flex flex-col">
        {/* 3D预览区域：渲染传入的 children（即 WorkbenchContent） */}
        <div className="flex-1 bg-gray-800">{children}</div>
        <BottonjustBar />
      </div>

      {/* 右侧资源管理器 */}
      <RightManager />
    </div>
  );
};

export default MainLayout;
