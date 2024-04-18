import React from 'react';

const GraphLegend = () => {
  return (
    <div className="p-4 border rounded shadow-sm bg-gray-50 text-sm">
      <div className="flex items-center mb-2">
        <div className="w-8 h-1 mr-2 bg-red-500"></div>
        <span>input: 0</span>
      </div>
      <div className="flex items-center">
        <div className="w-8 h-1 mr-2 bg-blue-500"></div>
        <span>input: 1</span>
      </div>
    </div>
  );
};

export default GraphLegend;
