import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [profileData,setProfileData]=useState({});
  const [usersData,setUsersData]=useState([]);
  // const [reload,setReload]=useState(false);

  const [taskDetails,setTaskDetails]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [filteringState,setFilteringState]=useState('all');

  const fetchData=async()=>{
    
    try {
      const token= localStorage.getItem("token");
   
    if(token){ 
    
      const fetchingProfileData=await axiosInstance.get("/auth/profile");
      // console.log(response.data);
      setProfileData(fetchingProfileData.data);
      

      //fetching users data 
      const fetchingUsersData=await axiosInstance.get("/users");
      setUsersData(fetchingUsersData.data);

      //fetching all task
      const fetchingAllTask=await axiosInstance.get("tasks/dashboard-data");
      // console.log(fetchingAllTask.data)
      setTaskDetails(fetchingAllTask.data);
      setLoading(false);
    }
    }
    catch (error) {
      console.log("Error in Admin Context",error.message);
      setError(error);
    }
  
  }

  
  const updateData=(updatedData)=>{
    setTaskDetails(updatedData);
  }

   useEffect(() => {
    // console.log("I M AdminContext.jsx");
    
  fetchData();
   }, [])


  return (
    <AdminContext.Provider value={{profileData,usersData,taskDetails,fetchData,loading,error,updateData,filteringState,setFilteringState}}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext=()=>useContext(AdminContext);