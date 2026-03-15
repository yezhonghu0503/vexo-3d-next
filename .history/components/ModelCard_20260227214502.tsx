import React, { useState } from "react";
import { Heart, Bookmark } from "lucide-react"; // 推荐使用lucide-react图标库，与Tripo3D风格一致

// 定义卡片数据的TS接口，规范传入参数
interface ModelCardProps {
  id: string | number;
  previewUrl: string; // 模型预览图链接
  placeholderStyle?: string; // 可选：自定义占位图背景样式
  userName: string; // 用户名（如IsoSphere_42）
  userAvatar: string; // 用户头像链接
  likeCount: number; // 点赞数量
  isCollected?: boolean; // 是否已收藏（默认false）
}

const ModelCard: React.FC<ModelCardProps> = ({
  id,
  previewUrl,
  placeholderStyle = "bg-[#333333]",
  userName,
  userAvatar,
  likeCount,
  isCollected = false,
}) => {
  // 本地状态管理：点赞数、收藏状态
  const [likes, setLikes] = useState<number>(likeCount);
  const [collected, setCollected] = useState<boolean>(isCollected);

  // 点赞事件处理
  const handleLike = () => {
    setLikes((prev) => prev + (collected ? 0 : 1)); // 简单模拟：未收藏时点赞数才变化
  };

  // 收藏事件处理
  const handleCollect = () => {
    setCollected((prev) => !prev);
  };

  return (
    <div className="w-[300px] bg-[#242424] rounded-xl overflow-hidden text-white flex flex-col">
      {/* 模型预览区域 - 模拟Tripo3D的黑色背景+内容居中 */}
      <div className={`w-full h-[350px] relative ${placeholderStyle}`}>
        {/* 模型图片：优先加载图片，失败则显示背景 */}
        <img
          src={previewUrl}
          alt={`Model preview by ${userName}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // 图片加载失败时隐藏img，显示占位背景
            e.currentTarget.style.display = "none";
          }}
        />

        {/* 可选：Tripo3D风格的暂停/更多按钮（如需可开启） */}
        {/* <button className="absolute top-4 left-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
          <Play className="w-4 h-4" />
        </button> */}
      </div>

      {/* 底部信息栏 - 核心：头像、名称、点赞、收藏 */}
      <div className="flex items-center justify-between p-4 gap-3">
        {/* 用户信息区 */}
        <div className="flex items-center gap-2 flex-1">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-[#555555] flex-shrink-0">
            <img
              src={userAvatar}
              alt={`Avatar of ${userName}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <span className="text-sm font-medium text-gray-100 truncate">
            {userName}
          </span>
        </div>

        {/* 互动区：点赞 + 收藏 */}
        <div className="flex items-center gap-4">
          {/* 点赞按钮 */}
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
            <span>{likes}</span>
          </button>

          {/* 收藏按钮 */}
          <button
            onClick={handleCollect}
            className={`w-5 h-5 ${
              collected
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400 hover:text-white"
            } transition-colors`}
            aria-label={collected ? "取消收藏" : "收藏"}
          >
            <Bookmark className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
