import React, { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import ManageTaskCard from '../../components/ManageTaskCard'
import { useAdminContext } from '../../context/AdminContext'
import {useEffect} from 'react'
import axios from "axios";
import axiosInstance from '../../utils/axiosInstance'
import TaskNav from '../../components/TaskNav'
import { useNavigate } from 'react-router-dom'

import Spinner from '../../components/Spinner'
import toast from 'react-hot-toast'
import {HashLoader} from 'react-spinners';
import ExcelReport from '../../components/ExcelReport'

const ManageTasks = () => {
    
  const [taskDetails,setTaskDetails]=useState();
  const [loading,setLoading]=useState(true);
  const {updateData}=useAdminContext();
  const fetchingTask=async()=>{
    try{
      const fetchingAllTask=await axiosInstance.get("tasks/dashboard-data");
        setTaskDetails(fetchingAllTask.data);
        updateData(fetchingAllTask.data);
        // console.log(fetchingAllTask.data);
        setLoading(false);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchingTask();

  },[])

  

 var {filteringState}=useAdminContext();
//  console.log(filteringState)
  if(loading) return <div className="flex flex-col items-center gap-2 justify-center h-screen">
  {/* <Spinner /> */}
  <HashLoader color="#0906ef"/>
  <p className="text-sm text-gray-500">Loading, please wait...</p>
</div>
  return (
    <AdminLayout>
          <div className='flex gap-4 flex-col'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>My Tasks</h1>
          <div className='flex gap-4'>
          <TaskNav taskDetails={taskDetails}/>
          <ExcelReport temp="tasks"/>
          </div>
        </div>
        <div className='w-full flex flex-wrap gap-4'>
        {taskDetails.recentTasks.map((task,idx)=>{
          if(filteringState=="inProgress") filteringState="in progress";
             
          if(filteringState=="all") {
         
          return <ManageTaskCard key={idx} taskId={task._id} role="admin"/>
          }
          else if(filteringState==task.status.toLowerCase())
          return <ManageTaskCard key={idx} taskId={task._id} role="admin"/>
      

        })}
        </div>
      </div>
    

    </AdminLayout>
  )
}

export default ManageTasks