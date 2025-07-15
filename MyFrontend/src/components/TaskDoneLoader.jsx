import React, { useEffect, useState } from 'react'

const TaskDoneLoader = ({ taskDone, total }) => {
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    if (total > 0) {
      setPerc((taskDone / total) * 100);
    }
  }, [taskDone, total]); 

  return (
    <div className='flex flex-col gap-1'>
      <div> <span className='text-gray-500 text-sm font-semibold'> Task Done : </span> <span className='text-sm font-semibold'> {`${taskDone}/${total}`} </span></div>
      <div className='w-full h-[8px] rounded-md bg-gray-300'>
        <div
          className='h-[8px] rounded-md bg-cyan-500 transition-all duration-500'
          style={{ width: `${perc}%` }}
        ></div>
      </div>
    </div>
  );
}

export default TaskDoneLoader;
