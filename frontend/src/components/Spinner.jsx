// components/Spinner.jsx
import React from 'react';

const Spinner = ({ size = "w-12 h-12", color = "border-blue-500" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${size}`}
      >
        
      </div>
    </div>
  );
};

export default Spinner;
