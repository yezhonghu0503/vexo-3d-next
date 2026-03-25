import React from "react";

const BottonjustBar: React.FC = () => {
  return (
    <div className="bg-gray-800 border-t border-gray-700 p-3 flex items-center justify-between">
      <div className="flex space-x-4">
        <button className="bg-gray-700 hover:bg-gray-600 rounded px-3 py-1 text-sm">
          旋转
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 rounded px-3 py-1 text-sm">
          缩放
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 rounded px-3 py-1 text-sm">
          平移
        </button>
      </div>
      <div className="flex space-x-4">
        <button className="bg-gray-700 hover:bg-gray-600 rounded px-3 py-1 text-sm">
          保存
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 rounded px-3 py-1 text-sm">
          导出
        </button>
      </div>
    </div>
  );
};

export default BottonjustBar;
