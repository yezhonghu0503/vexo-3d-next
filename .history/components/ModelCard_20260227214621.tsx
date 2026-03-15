import React from "react";
import ModelCard from "./components/ModelCard";

// 模拟你的模型数据
const modelList = [
  {
    id: 1,
    previewUrl: "/images/vintage-typewriter.jpg", // 你的图片路径
    userName: "molly",
    userAvatar: "/avatars/molly.jpg",
    likeCount: 24,
  },
  {
    id: 2,
    previewUrl: "/images/chibi-dragon.jpg",
    userName: "Jeje02_B7",
    userAvatar: "/avatars/jeje.jpg",
    likeCount: 13,
    isCollected: true, // 模拟已收藏状态
  },
];

const ModelGallery: React.FC = () => {
  return (
    <div className="bg-[#1a1a1a] min-h-screen p-6">
      {/* 卡片网格布局 - 适配多卡片展示 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {modelList.map((model) => (
          <ModelCard key={model.id} {...model} />
        ))}
      </div>
    </div>
  );
};

export default ModelGallery;
