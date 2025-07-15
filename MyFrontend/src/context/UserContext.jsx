import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


const UserContext=createContext();
export const UserProvider = ({ children }) => {

  
  const [profileData,setProfileData]=useState([]);

  const fetchData=async()=>{

    try {
      const token= localStorage.getItem("token");
      
      
      const decoded=jwtDecode(token);
      // console.log(decoded);
      
       await axios.get(`http://localhost:8000/api/users/${decoded.id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response=>{
        // console.log(response.data);
        const data=response.data;
         const pData={name:data.name,email:data.email,role:data.role,profileImageUrl:data.profileImageUrl};
        //  console.log(pData)
        setProfileData(pData);
      })

    //   //fetching users data 
    //   await axios.get(`http://localhost:8000/api/users/`,{
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }).then(response=>{
    //     // console.log("User Data",response.data);
    //     setUsersData(response.data);
    //     // console.log(response.data);
       
    //   })

    //   //fetching all task
    //   await axios.get("http://localhost:8000/api/tasks",{
    //     headers:{
    //       Authorization:`Bearer ${token}`
          
    //     }
    //   }).then(response=>{
    //     setAllTask(response.data);
    //     // console.log("task data",response.data);
    //   })
    }

    catch (error) {
      console.log("Error in User Context",error.message);
    }
  }

  useEffect(() => {
    // console.log("I M UserContext.jsx");

  // fetchData();
   }, [])
 

  return (
    <>
  
    <UserContext.Provider value={{profileData,fetchData}}>
      {children}
    </UserContext.Provider>
    
    </>
  
  );
};

export const useUserContext=()=>useContext(UserContext);