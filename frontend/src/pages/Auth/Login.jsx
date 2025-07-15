import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import Input from '../../components/Input'
import axiosInstance from '../../utils/axiosInstance.js'
import {jwtDecode} from 'jwt-decode';
import {toast, Toaster} from 'react-hot-toast';
import { useAdminContext } from '../../context/AdminContext'

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  // const {fetchData}=useAdminContext();

  const navigate=useNavigate();

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
  return (
    <>   
    <AuthLayout>
     <div className='flex flex-col h-full  justify-center w-full p-8 lg:w-[80%] border-amber-900 border- md:justify-end'>
      <div className='leading-tight text-center md:text-left'>
        <h2 className='font-bold text-[22px]'>Welcome Back</h2>
        <p className='text-gray-500 text-[14px]'>Please enter your details to login</p>
      </div>
      <div className='mt-8'>
        <form  className='flex flex-col items-center  gap-2 md:items-start'>
          
          <div className='flex flex-col gap-y-4 border-0 border-red-500 w-[50%] min-w-[300px]'>
          
          <Input type="email" placeholder='deep@example.com' Label="Email Address" setField={setEmail} auth="login"/>
          <Input type="password" placeholder='Min 8 Characters' Label="Password" setField={setPassword} auth="login"/>
        
          </div>
          <button className='bg-blue-600 text-white py-1 text-lg rounded-sm mt-4 px-4 w-[50%] min-w-[300px]' onClick={(e)=>handleLogin(e)}>LOGIN</button>
          <p>Don't have an account?<Link to="/signup" className='text-blue-700'>Signup</Link></p>
        </form>
      </div>
      </div>
      
    </AuthLayout>
    </>
 
  )
}

export default Login