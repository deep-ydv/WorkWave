import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import Input from '../../components/Input'
import axiosInstance from '../../utils/axiosInstance.js'
import {jwtDecode} from 'jwt-decode';
import {toast, Toaster} from 'react-hot-toast';
import { useAdminContext } from '../../context/AdminContext'
import HowToUse from '../../components/HowToUse'
import { IoIosCloseCircleOutline } from "react-icons/io"

import Loading from '../../components/Loading'
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [howToUse,setHowToUse]=useState(false);
  const [loginLoading,setLoginLoading]=useState(false);

  // const {fetchData}=useAdminContext();

  const navigate=useNavigate();
  const handleHowToUse=()=>{
setHowToUse(prev=>!prev)
  }

  useEffect(()=>{
    // console.log("I M Login.jsx");

    const token=localStorage.getItem('token');
    // console.log(token)
    if(token){
      const decode=jwtDecode(token);
      // console.log(decode);
      if(decode.role==="admin") navigate('/admin/dashboard');
      else if(decode.role==="member") navigate('/user/dashboard');
    }
  },[])
  
  const handleLogin=async(e)=>{
    // toast.success('Login Successful!', {
    //   duration: 1000, // how long toast stays
    //    // position
    //   style: {
    //     background: '#333',
    //     color: '#fff',
    //   },
    // });
    e.preventDefault();
    try{
      if(!email){
        toast.error("Email Required");
        return;
      }
      if(!password){
        toast.error("Password Required");
        return;
      }
      setLoginLoading(true);
      const response=await axiosInstance.post('/auth/login',{
        email,
        password,
      });

      if(response){
        toast.success("Login Successfully!");
      // console.log("Login Successful",response.data);
      localStorage.setItem('token',response.data.token);
      // await fetchData(response.data.role);
      if(response.data.role==="admin") navigate("/admin/dashboard");
      else if(response.data.role==="member") navigate("/user/dashboard");
      }
     

    }
    catch(error){
      setLoginLoading(false);
      console.log("Login Error", error);

      // Safely extract message
      const message =
        error?.response?.data?.message || "Something went wrong. Please try again.";
    
      toast.error(message, {
        duration: 1000,
        style: {
          background: "#333",
          color: "#fff",
      },
    });
    }
    
  }
  if(loginLoading){
    return <Loading/>
  }
  return (
    <>   
    <AuthLayout>
     <div className='relative flex flex-col h-full  justify-center w-full p-8 lg:w-[80%] border-amber-900 border- md:justify-end'>
     {<div className={`${howToUse?"block":"hidden"} absolute z-15 flex justify-center`}> <p className="absolute flex  w-[80%] justify-end px-2 py-1"><IoIosCloseCircleOutline className="text-purple-700 text-2xl hover:text-red-600 font-semibold cursor-pointer" onClick={handleHowToUse} /></p> <HowToUse/></div>}
      <div className='leading-tight text-center md:text-left text-white'>
        <h2 className='font-bold text-[18px] sm:text-[22px]'>Welcome Back</h2>
        <p className='text-gray-400 text-[10px] sm:text-[14px]'>Please enter your details to login</p>
      </div>
      <div className='mt-8 relative'>
        <form  className='flex flex-col items-center  gap-2 md:items-start'>
          
          <div className='flex flex-col gap-y-4 border-0 border-red-500 w-[50%] min-w-[300px]'>
          
          <Input type="email" placeholder='deep@example.com' Label="Email Address" setField={setEmail} auth="login"/>
          <Input type="password" placeholder='Min 8 Characters' Label="Password" setField={setPassword} auth="login"/>
        
          </div>
          <button className='bg-blue-600 text-white py-1 text-lg rounded-sm mt-4 px-4 w-[50%] min-w-[300px]' onClick={(e)=>handleLogin(e)}>LOGIN</button>
          <p className='text-white'>Don't have an account?<Link to="/signup" className='text-blue-400 hover:text-blue-700'>Signup</Link></p>
        </form>
        {/* <p className='text-red-300 cursor-pointer hover:text-red-600' onClick={handleHowToUse}>*How to use</p> */}
       
      </div>
      </div>
      
    </AuthLayout>
    </>
 
  )
}

export default Login