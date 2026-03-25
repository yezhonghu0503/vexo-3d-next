import React from "react";

const RightManager: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 border-l border-gray-700 p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-4">资源库</h3>
      <div className="space-y-3 overflow-y-auto flex-1">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="bg-gray-700 rounded p-2 flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gray-600 rounded"></div>
            <span className="text-sm">模型 {item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightManager;
