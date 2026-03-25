import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-4">生成模型</h3>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">模型类型</label>
          <select className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm">
            <option>建筑</option>
            <option>道具</option>
            <option>角色</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">风格</label>
          <input
            type="text"
            placeholder="输入风格关键词"
            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
          />
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 rounded py-2 text-sm font-medium">
          生成
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
