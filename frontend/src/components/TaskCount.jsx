import React from 'react'

const TaskCount = ({clr,number,text}) => {

  const colorMap = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    green: 'bg-green-500',
  }
  return (
    <div className='flex gap-2 items-center'>
      <p className={`w-[10px] h-[24px] ${colorMap[clr]} rounded-2xl`}></p>
      <p className='text-gray-800'><span className='font-semibold'>{number}</span> {text}</p>
    </div>
  )
}

export default TaskCount