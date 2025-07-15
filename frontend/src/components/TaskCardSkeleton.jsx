import React from "react";

const TaskCardSkeleton = () => {
  return (
    <div className="w-[300px] p-4 rounded-xl shadow-md bg-white animate-pulse flex flex-col gap-4">
      {/* Status tags */}
      <div className="flex justify-between">
        <div className="w-20 h-6 bg-purple-200 rounded-full" />
        <div className="w-24 h-6 bg-red-200 rounded-full" />
      </div>

      {/* Title & Description */}
      <div className="flex flex-col gap-1">
        <div className="w-2/3 h-4 bg-gray-300 rounded" />
        <div className="w-1/2 h-3 bg-gray-200 rounded" />
      </div>

      {/* Task Progress */}
      <div className="flex items-center gap-2">
        <div className="w-28 h-4 bg-gray-300 rounded" />
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full" />

      {/* Dates */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <div className="w-16 h-3 bg-gray-300 rounded" />
          <div className="w-20 h-4 bg-gray-200 rounded" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-16 h-3 bg-gray-300 rounded" />
          <div className="w-20 h-4 bg-gray-200 rounded" />
        </div>
      </div>

      {/* User profile image */}
      <div className="w-8 h-8 bg-gray-300 rounded-full" />
    </div>
  );
};

export default TaskCardSkeleton;
