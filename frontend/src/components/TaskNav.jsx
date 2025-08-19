import React, { useState } from 'react';
import { useAdminContext } from '../context/AdminContext';

const TaskNav = ({ taskDetails }) => {
  const [activeStatus, setActiveStatus] = useState("all");

  const getActiveStyle = (status) => {
    const isActive = activeStatus === status;
    return {
      text: isActive ? "text-blue-600 font-semibold border-b-2 pb-1" : "",
      badge: isActive ? "bg-blue-600 text-white" : "bg-gray-300",
    };
  };
    const {setFilteringState}=useAdminContext()
  const handleClick = (status) => {
    setActiveStatus(status);
    setFilteringState(status);
    // Optionally, do filtering or inform parent component here
  };

  return (
    <div className="flex gap-2  items-center">
      {["all", "pending", "inProgress", "completed"].map((statusKey) => {
        const displayName =
          statusKey === "all"
            ? "All"
            : statusKey === "inProgress"
            ? "In Progress"
            : statusKey.charAt(0).toUpperCase() + statusKey.slice(1);

        const count = taskDetails.charts.taskDistribution[
          statusKey === "all"
            ? "All"
            : statusKey.charAt(0).toUpperCase() + statusKey.slice(1)
        ];

        const { text, badge } = getActiveStyle(statusKey);

        return (
          <p
            key={statusKey}
            className={`cursor-pointer ${text} text-xs sm:text-md border- text-center `}
            onClick={() => handleClick(statusKey)}
          >
            {displayName}{" "}
            <span className={`rounded-xl px-3 ${badge} text-xs sm:text-md`}>{count}</span>
          </p>
        );
      })}
    </div>
  );
};

export default TaskNav;
