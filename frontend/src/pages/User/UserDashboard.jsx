import React, {useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import GraphSection from '../../components/GraphSection';
import Greet from '../../components/Greet';
import RecentTasks from '../../components/RecentTasks';
import Spinner from '../../components/Spinner';
import {HashLoader} from 'react-spinners'

import UserLayout from '../../components/UserLayout';
import { useUserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
const UserDashboard = () => {

  const [taskDetail,setTaskDetail]=useState([]);

  const navigate=useNavigate();

  const {fetchData,profileData}=useUserContext();
 const fetchUserTasks=async()=>{
  try{
    const response = await axiosInstance.get('/tasks/user-dashboard-data');
    // console.log(response.data);
    setTaskDetail(response.data);
  }
  catch(error){
    console.log(error);
  }
 }
  // const handleLogout=(e)=>{
  //   e.preventDefault();
  //   localStorage.removeItem('token');
  //   toast.success("Logout Successfully");
  //   window.location.reload();
  // }
  useEffect (()=>{
    // console.log("I M UserDashboard.jsx");

    fetchUserTasks();
    const token=localStorage.getItem('token');
    if(!token){
      navigate("/login");
    }
    fetchData();
  },[])
  return (
    <>{taskDetail.length<=0?<div className="flex flex-col items-center gap-2 justify-center h-screen">
    {/* <Spinner /> */}
    <HashLoader color="#0906ef"/>
    <p className="text-sm text-gray-500">Loading, please wait...</p>
  </div>:
    <UserLayout>
    <div>
       
       <Greet profileData={profileData} taskDetail={taskDetail}/>
      {taskDetail.recentTasks.length==0?"No task available at this moment":<>
       <GraphSection taskDetail={taskDetail}/>

       <RecentTasks recentTasks={taskDetail.recentTasks} />
       </>
  }

    </div>
    </UserLayout>
    }</>
  )
}

export default UserDashboard