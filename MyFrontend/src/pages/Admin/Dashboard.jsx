import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdCurrencyBitcoin,
  MdMenu,
  MdOutlineAddBox,
  MdOutlineDashboard,
} from "react-icons/md";
import Menu from "../../components/Menu";
import MainContent from "../../components/MainContent";
import toast, { Toaster } from "react-hot-toast";
import MenuOptions from "../../components/MenuOptions";
import { FaTasks } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { RxExit } from "react-icons/rx";
import TaskCount from "../../components/TaskCount";

import DistributionChart from "../../components/DistributionChart";
import PriorityBarChart from "../../components/PriorityBarChart";
import RecentTasks from "../../components/RecentTasks";
import AdminLayout from "../../components/AdminLayout";
import { useAdminContext } from "../../context/AdminContext";
import axios from "axios";
import Greet from "../../components/Greet";
import GraphSection from "../../components/GraphSection";
import axiosInstance from "../../utils/axiosInstance";
import SkeletonLoader from "../../components/Spinner";
import Spinner from "../../components/Spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  


  const { profileData,taskDetails,fetchData,loading} = useAdminContext();

    

  useEffect(() => {
    // console.log("I M Dashboard.jsx",taskDetails);
    fetchData();
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    
  }, []);

  if(loading) return <div className="flex flex-col items-center gap-2 justify-center h-screen">
  <Spinner />
  <p className="text-sm text-gray-500">Loading, please wait...</p>
</div>
  return (
    <AdminLayout>
   
          {/*Other section  */}
          <div className="w-full h-screen gap-4 flex flex-col  ">
            {/* Good Morning section */}
            <Greet profileData={profileData} taskDetail={taskDetails} />

            {/* Graph section */}
            
            <GraphSection taskDetail={taskDetails}  />

            {/* RecentTask */}

            <RecentTasks recentTasks={taskDetails.recentTasks} />
          </div>
      
      
    </AdminLayout>
  );
};

export default Dashboard;
