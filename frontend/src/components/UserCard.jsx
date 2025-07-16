import React, { useEffect, useState } from 'react'
import { useAdminContext } from '../context/AdminContext'
import { MdDeleteOutline } from "react-icons/md";
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast'

const UserCard = () => {
  // const [card,setCard]=useState([]);
  const [userId,setUserId]=useState('');
  const { usersData } = useAdminContext();
  const [deleteUserBox,setDeleteUserBox]=useState(false);
  const handleDeleteUser=(id)=>{
    setUserId(id);
    // console.log(id);
    setDeleteUserBox(prev=>!prev);
  }
const handleFinalDelete=async()=>{
  try{
    const response=await axiosInstance.delete(`/users/${userId}`)
    // console.log(response);
    if(response) toast.success("User Deleted Successfully");
    setDeleteUserBox(prev=>!prev);
  }
  catch(error){
    console.log(error);
  }
}
useEffect(() => {
//  console.log(usersData);
}, [usersData]);

  return (
   <div className='relative w-full flex gap-4 flex-wrap'>

     {/* Delete message component */}
     <div className={`z-10 absolute ${deleteUserBox?"block":"hidden"} w-full  h-[400px]  flex justify-center items-center`}>
        <div className={` rounded-md shadow-2xl bg-red-300 gap-4 flex flex-col justify-center px-8 py-4`}>
          <p className="font-semibold ">Are you sure you want to delete this User?</p> 
          <div className="flex justify-end gap-4 ">
          <button className="px-2 bg-red-100 border-1  font-semibold rounded-md cursor-pointer" onClick={handleDeleteUser}>Cancel</button>
          <button className="px-2 bg-red-100 border-1 text-red-600 font-semibold rounded-md cursor-pointer" onClick={handleFinalDelete}>Delete</button>
          </div>
          </div>
          </div>
          {/* Finish */}
      


     {usersData.length>0?
        usersData.map((user,idx)=>{
         return <div key={idx} className='flex flex-col text-sm shadow-sm p-4 rounded-md gap-4'>
          <div className='flex  justify-between'>
            <div className="flex gap-4 items-center">
            <div><img className='rounded-[50%] w-[35px]' src={user.profileImageUrl?user.profileImageUrl:"https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"} alt="" /></div>
            <div className=''>
              <p className='font-semibold'>{user.name}</p>
              <p className='text-gray-500 text-xs'>{user.email}</p>
            </div>
            </div>
            <MdDeleteOutline className="text-2xl text-red-400 cursor-pointer" onClick={()=>handleDeleteUser(user._id)}/>
            
          </div>
          <div className='flex gap-2'>
            <div className='bg-gray-100 px-4 py-1 rounded-md text-purple-700'>
              <p className='font-semibold'>{user.pendingTasks}</p>
              <p>Pending</p>
            </div>
            <div className='bg-gray-100 px-4 py-1 rounded-md text-cyan-600'>
              <p className='font-semibold'>{user.inProgressTasks}</p>
              <p>In Progress</p>
            </div>
            <div className='bg-gray-100 px-4 py-1 rounded-md text-green-600'>
              <p className='font-semibold'>{user.completedTasks}</p>
              <p>Completed</p>
            </div>
          </div>
        </div>
        })
      
      :<div>Loading...</div>
    }
   </div>
      
  )
}

export default UserCard