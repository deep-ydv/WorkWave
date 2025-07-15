import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ManageTaskCard from '../../components/ManageTaskCard';
import Spinner from '../../components/Spinner';
import TaskNav from '../../components/TaskNav';
import UserLayout from '../../components/UserLayout'
import { useAdminContext } from '../../context/AdminContext';
import axiosInstance from '../../utils/axiosInstance';

const MyTasks = () => {
  const [taskDetails,setTaskDetails]=useState([]);
  


  const taskData=async()=>{
    
    try{
      const response=await axiosInstance.get("/tasks/user-dashboard-data");
      
    
      setTaskDetails(response.data);
      // console.log("success",response);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    // console.log("I M MyTask.jsx");

    taskData();
  },[])

  var {filteringState}=useAdminContext();

  return (
    <UserLayout>
    {taskDetails.length<=0?<div className="flex flex-col items-center gap-2 justify-center h-screen">
  <Spinner />
  <p className="text-sm text-gray-500">Loading, please wait...</p>
</div>:<div  className='flex gap-4 flex-col'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>All Tasks</h1>
          {/* <div className='flex gap-4'> */}
          <TaskNav taskDetails={taskDetails}/>
          {/* <button className='bg-lime-200 px-2 py-1 rounded-md' onClick={()=>exportDataInExcel(taskDetails)}>Download Report</button> */}
          {/* </div> */}
        </div>
        <div className='w-full flex flex-wrap gap-4'>
        {taskDetails.recentTasks.map((task,idx)=>{
          if(filteringState=="inProgress") filteringState="in progress";
          if(filteringState=="all")
          return <ManageTaskCard key={idx} taskId={task._id}/>
          else if(filteringState===task.status.toLowerCase())
          return <ManageTaskCard key={idx} taskId={task._id}/>

        })}
        </div>
      </div>
      }

    </UserLayout>
  )
}

export default MyTasks