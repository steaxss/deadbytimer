import React from 'react';

const DragHandle: React.FC = () => {
  return (
    <div className="drag-handle absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-primary-600 bg-opacity-50 hover:bg-opacity-70 transition-all duration-200 rounded-b-md flex items-center justify-center cursor-move">
      <div className="flex space-x-1">
        <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
        <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
        <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
      </div>
    </div>
  );
};

export default DragHandle;