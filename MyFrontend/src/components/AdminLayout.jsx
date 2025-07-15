import React, { useEffect } from 'react'
import { FaTasks } from 'react-icons/fa'
import { GoPeople } from 'react-icons/go'
import { MdOutlineAddBox, MdOutlineDashboard } from 'react-icons/md'
import { RxExit } from 'react-icons/rx'
import { useAdminContext } from '../context/AdminContext'
import MenuOptions from './MenuOptions'

const AdminLayout = ({children}) => {

  const { profileData,loading,error }=useAdminContext();

 
  
  if(loading) return <div className='w-full h-screnn flex justify-center items-center'>Loading...</div>
  if(error) return <div>{error}</div>


  return (
    <div>
       <div className="flex fixed w-full z-50 items-center justify-between px-4 bg-white h-15 border-b-1 border-b-gray-200">
        <p className='text-xl font-bold'>Work Wave</p>
        {/* <p onClick={handleLogout}>Logout</p> */}
      </div>

        <div className='flex'>
        {/* Sidebar */}
        <div className="bg-white w-[18%] h-screen pt-20 fixed z-10 ">
          <div className="flex flex-col justify-center items-center py-4">
            <img src={`${profileData.profileImageUrl? profileData.profileImageUrl:"https://e7.pngegg.com/pngimages/507/702/png-clipart-profile-icon-simple-user-icon-icons-logos-emojis-users-thumbnail.png"}`} alt="profileImg" className="w-[80px] h-[80px] rounded-[50%]" />
            <p className="bg-blue-600 text-white px-4 py-1 text-[12px] rounded-lg">Admin</p>
            <p className="font-bold text-[18px] mt-4">{profileData.name}</p>
            <p className="text-gray-800 text-[14px]">{profileData.email}</p>
          </div>

          <div className="flex flex-col gap-8 font-semibold pt-6">
          <MenuOptions icon={<MdOutlineDashboard/>} text="Dashboard" route="/admin/dashboard" />
        <MenuOptions icon={<FaTasks/>} text="Manage Tasks" route="/admin/tasks"/>
        <MenuOptions icon={<MdOutlineAddBox/>} text="Create Task" route="/admin/create-task"/>
        <MenuOptions icon={<GoPeople/>} text="Team Members" route="/admin/users"/>
        <MenuOptions icon={<RxExit/>} text="Logout"/>
          </div>
        </div>
        <div className='pt-20 pl-75 w-full pr-6'>
        {children}
        </div>
      </div>

    </div>
  )
}

export default AdminLayout