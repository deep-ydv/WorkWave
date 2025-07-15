import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';


const AuthContext=createContext();
export const AuthProvider = ({ children }) => {

  const [role,setRole]=useState("nothing");

  const fetchDetails=async()=>{
    try{
        const token=localStorage.getItem("token");
        if(token){
        const decoded=jwtDecode(token);
        // console.log(decoded.role);
        setRole(decoded.role);
        }
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    // console.log("I M AuthContext.jsx");

    fetchDetails();
  },[])
  

  return (
    <>
  
    <AuthContext.Provider value={{role}}>
      {children}
    </AuthContext.Provider>
    
    </>
  
  );
};

export const useAuthContext=()=>useContext(AuthContext);