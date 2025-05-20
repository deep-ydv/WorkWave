import React, { useRef, useState , useEffect} from 'react'
import AuthLayout from '../../components/AuthLayout'
import Input from '../../components/Input'
import { MdOutlineFileUpload } from "react-icons/md";
import { Link } from 'react-router-dom';
import { uploadImageToCloudinary } from '../../utils/uploadImage';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


import axiosInstance from "../../utils/axiosInstance.js"

const Signup = () => {
  
  const [formData,setFormData]=useState({});
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [adminInviteToken,setAdminInviteToken]=useState("");
  const [profileImageUrl,setProfileImageUrl]=useState("");
  const [fileData,setFileData]=useState(null);

  
  const navigate = useNavigate();

  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(token){
      const decode=jwtDecode(token);
      if(decode.role==="admin") navigate('/admin/dashboard');
      else if(decode.role==="member") navigate('/user/dashboard');
    }
  },[])

  const fileInputRef = useRef();
  

  const handleClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click(); // Trigger the file input dialog
  };

  const handleFileChange = async(event) => {
    
    const file=event.target.files[0];
    
    if(!file) return;
    setFileData(file);
    // console.log('Selected file:', file);
  
      const image=URL.createObjectURL(file);
      setProfileImageUrl(image);
      // console.log(profileImageUrl);
      URL.revokeObjectURL(file);
      // const url=await uploadImageToCloudinary(file);
      // if(url) setProfileImageUrl(url);

  };

  const handleFormSubmit=async(e)=>{
    e.preventDefault();
    try{
      if(fileData) {
        const url=await uploadImageToCloudinary(fileData);
        if(url) setProfileImageUrl(url);
        setProfileImageUrl(url);
      }
      const newData={
        name,
        email,
        password,
        adminInviteToken,
        profileImageUrl,
      };
      setFormData(newData);
      console.log(newData);

      const response=await axiosInstance.post('/auth/register',{
        name,
        email,
        password,
        adminInviteToken,
        profileImageUrl,
      });
      localStorage.setItem('token',response.data.token);
      console.log('User Registered',response.data);
      if(response.data.role==="admin")
      navigate("/admin/dashboard");
      else if(response.data.role==="member")
      navigate("/user/dashboard")
  
    }
    catch(error){
      console.log("Error in Form Submit",error.message);
    }

    
    



  };
  
  return (
    <AuthLayout>
      <div className='flex flex-col w-full  p-4'>
      <div className='leading-tight'>
        <h2 className='font-bold text-[22px]'>Create an Account</h2>
        <p className='text-gray-500 text-[14px]'>Join us today by entering your details below.</p>
      </div>
      <div className=''>
        <form  className='flex flex-col gap-2'>
          <div className='flex justify-center'>
            <div className='relative my-6 w-[70px] border-1 h-[70px] rounded-[50%]'>
              <img src={profileImageUrl? profileImageUrl: "https://static.vecteezy.com/system/resources/previews/007/167/661/non_2x/user-blue-icon-isolated-on-white-background-free-vector.jpg"} className='w-full h-full rounded-[50%]' alt="pic" />
              <button className='rounded-[50%] absolute top-11 left-11 bg-blue-500 p-2'      onClick={(e)=>handleClick(e)} ><MdOutlineFileUpload className="text-white"/></button>
              <input  type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
       />
              </div>
          </div>
          <div className='flex  flex-wrap gap-x-8 gap-y-4'>
          <Input type="text" placeholder='Deep' Label="Full Name" setField={setName}/>
          <Input type="email" placeholder='deep@example.com' Label="Email Address" setField={setEmail}/>
          <Input type="password" placeholder='Min 8 Characters' Label="Password" setField={setPassword}/>
          <Input type="text" placeholder='6 Digit Code' Label="Admin Invite Token" setField={setAdminInviteToken}/>
          </div>
          <button className='bg-blue-600 text-white py-1 text-lg rounded-sm mt-4' onClick={(e)=>handleFormSubmit(e)}>SIGN UP</button>
          <p>Already have an account?<Link to="/login" className='text-blue-700'>login</Link></p>
        </form>
      </div>
      </div>
    </AuthLayout>
  )
}

export default Signup