import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import Input from '../../components/Input'
import axiosInstance from '../../utils/axiosInstance.js'
import {jwtDecode} from 'jwt-decode';

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate=useNavigate();

  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(token){
      const decode=jwtDecode(token);
      console.log(decode);
      if(decode.role==="admin") navigate('/admin/dashboard');
      else if(decode.role==="member") navigate('/user/dashboard');
    }
  },[])
  
  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      const response=await axiosInstance.post('/auth/login',{
        email,
        password,
      });
      if(response){
        console.log("Loin Successful",response.data);
      localStorage.setItem('token',response.data.token);
      if(response.data.role==="admin") navigate("/admin/dashboard");
      else if(response.data.role==="member") navigate("/user/dashboard");
      }
    }
    catch(error){
      console.log("Login Error",error.message);
    }
  }
  return (
    <AuthLayout>
       <div className='flex flex-col w-full  p-4'>
      <div className='leading-tight'>
        <h2 className='font-bold text-[22px]'>Welcome Back</h2>
        <p className='text-gray-500 text-[14px]'>Please enter your details to login</p>
      </div>
      <div className='mt-8'>
        <form  className='flex flex-col gap-2'>
          
          <div className='flex flex-col gap-y-4'>
          
          <Input type="email" placeholder='deep@example.com' Label="Email Address" setField={setEmail}/>
          <Input type="password" placeholder='Min 8 Characters' Label="Password" setField={setPassword}/>
        
          </div>
          <button className='bg-blue-600 text-white py-1 text-lg rounded-sm mt-4 w-[48%]' onClick={(e)=>handleLogin(e)}>LOGIN</button>
          <p>Don't have an account?<Link to="/signup" className='text-blue-700'>singup</Link></p>
        </form>
      </div>
      </div>
    </AuthLayout>
  )
}

export default Login