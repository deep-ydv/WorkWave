import React, { useEffect, useState } from 'react'
import { ImAttachment } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import DateFixing from './DateFixing'
import ProfilePicWithId from './ProfilePicWithId'
import TaskDoneLoader from './TaskDoneLoader'
import UsersProfilePic from './UsersProfilePic'
import TaskCardSkeleton from './TaskCardSkeleton'

const ManageTaskCard = ({taskId,role}) => {

  const[completedTask,setCompletedTask]=useState(0);

  const getProgressStyle=(p)=>{
    if(p=="Pending") return "text-purple-700 bg-purple-200";
    else if(p=="In Progress") return "text-cyan-700 bg-cyan-100";
    else if(p=="Completed") return "text-green-700 bg-green-100";
  }
 
  const getPriorityStyle=(p)=>{
    if(p=="Low") return "text-cyan-700 bg-cyan-100";
    else if(p=="Medium") return "text-yellow-700 bg-yellow-100 ";
    else if(p=="High") return "text-red-700 bg-red-100 ";
    else return "text-black";
  }
  const getSideBorderColor=(p)=>{
    if(p=="Pending") return "border-purple-600";
    else if(p=="In Progress") return "border-cyan-600";
    else if(p=="Completed") return "border-green-600";
  }

  

  const navigate=useNavigate();
  const handleViewTask=()=>{
    if(role==="admin") navigate(`/admin/update-task-details/${taskId}`);
    else navigate(`/user/task-details/${taskId}`);
  }
  
  const [task,setTask]=useState([]);
  const fetchTaskById=async()=>{
    try{
      const response=await axiosInstance.get(`/tasks/${taskId}`);
      // console.log(response.data);
      // console.log(task.length);
      setTask(response.data);
      response.data.todoChecklist.map((t)=>{
        if(t.completed===true) setCompletedTask(prev=>prev+1);
      })
      
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchTaskById();
  },[]);

  
  
  return (
    <>
    {Object.entries(task).length<=0?<TaskCardSkeleton/>:
    <div onClick={handleViewTask} className='flex w-[32%] text-sm flex-col gap-4 py-4 rounded-2xl bg-gray-100 shadow-md'>
    
      <div className='flex gap-4 px-4'>
        <p className={`${getProgressStyle(task.status)} border-1 px-4 rounded-lg font-semibold`}>{task.status}</p>
        <p className={`${getPriorityStyle(task.priority)} border-1 px-4 rounded-lg font-semibold`}>{task.priority} Priority</p>
      </div>

      <div className={`${getSideBorderColor(task.status)} border-l-4 px-4 flex flex-col gap-1`}>
        <p className='font-semibold capitalize text-md'>{task.title}</p>
        <p className='line-clamp-2 text-gray-500 text-xs h-[35px]'>{task.description}</p>
        <TaskDoneLoader taskDone={completedTask/2} total={task.todoChecklist.length}/>
      </div>

      <div className='flex justify-between px-4'>
        <div>
          <p className='text-gray-500'>Start Date</p>
          <div><DateFixing date={task.createdAt.slice(0,10)}/></div>
        </div>
        <div>
          <p className='text-gray-500'>Due Date</p>
          <div><DateFixing date={task.dueDate.slice(0,10)}/></div>
        </div>
      </div>

      <div className='flex justify-between px-4'>
        <div className='border- w-[200px]'><UsersProfilePic checkedUsers={task.assignedTo}/></div>
        {task.attachments.length>0?<div className='flex items-center'><ImAttachment className='text-sm'/>{task.attachments.length}</div>:""}
      </div>
    </div>
    }
    
     </>
  )
}

export default ManageTaskCard