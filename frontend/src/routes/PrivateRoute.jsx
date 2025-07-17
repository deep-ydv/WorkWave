

import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import {  Outlet, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import {HashLoader} from 'react-spinners'


const PrivateRoute = ({ allowedRoles }) => {
  const [loading,setLoading]=useState(true);
  // console.log("I M PrivateRoute");
  // console.log("Role-",allowedRoles);
  const navigate=useNavigate();
  const fetchingRole=()=>{
    const token=localStorage.getItem("token");
    if(!token){
     navigate('/login');
     return;
    }  
    const decode=jwtDecode(token);
    // console.log(decode.role);
    if(allowedRoles!=decode.role) navigate("/unauthorized-access");
    else setLoading(false);
  }

  useEffect(()=>{
    fetchingRole();
  },[])
  if(loading) return <div className="flex flex-col items-center gap-2 justify-center h-screen">
  {/* <Spinner /> */}
  <HashLoader color="#0906ef"/>
  <p className="text-sm text-gray-500">Loading, please wait...</p>
</div>
  return <Outlet />;
};

export default PrivateRoute;
