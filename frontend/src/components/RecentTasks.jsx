import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import DateFixing from './DateFixing';
const RecentTasks = ({recentTasks}) => {


  return (
    <div className="bg-white rounded-xl">
    <div className='flex flex-col p-4'>
      <div className='flex px-4 justify-between'>
        <p className='font-semibold text-xl'>Recent Tasks</p>
        {/* <p className='px-3 font-semibold flex items-center justify-between bg-gray-100 rounded-xl py-1 gap-4 text-sm'>See All <FaArrowRight/></p> */}
      </div>
      <div className='flex flex-col px-8 py-4'>
        <div className='flex py-2 border-b-1 border-b-gray-400 justify-between font-semibold'>
          <p className='w-40%'>Name</p>
          <div className='flex justify-between w-[60%] px-16'>
          <p className='w-[33%]'>Status</p>
          <p className='w-[33%]'>Priority</p>
          <p className='w-[33%]'>Created On</p>
          </div>
        </div>

        {/* Tasks */}
       { recentTasks.map((task,idx)=>{
          return <div key={idx} className="flex pt-2 pb-4 border-b-1 border-b-gray-200 justify-between ">
          <p className='w-[40%]'>{task.title}</p>
          <div className='flex justify-between w-[60%] px-16'>
            <div className='w-[33%]'>
            <span className={`px-3 text-[12px] font-semibold py-1 rounded-md ${ task.status==="Pending" ? "text-purple-800" : (task.status==="In Progress"?"text-cyan-800": "text-green-700")} ${ task.status==="Pending" ? "bg-purple-200" : (task.status==="In Progress"?"bg-cyan-200": "bg-green-200")} `}>{task.status}</span>
            </div>

            <div className='w-[33%]'>
            <span className={`px-3 text-[12px] font-semibold py-1 rounded-md ${ task.priority==="High" ? "text-red-800" : (task.priority==="Medium"?"text-yellow-800": "text-green-700")} ${ task.priority==="High" ? "bg-red-200" : (task.priority==="Medium"?"bg-yellow-200": "bg-green-200")} `}>{task.priority}</span>
            </div>
          
          
          <div className='w-[33%]'><DateFixing date={task.createdAt.slice(0,10)}/></div>
          </div>
          </div>
        })
      }
      </div>

    </div>
    </div>
  )
}

export default RecentTasks