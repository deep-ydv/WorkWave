import React from 'react'
import { MdOutlineAddBox, MdOutlineDashboard } from 'react-icons/md'
import { FaTasks } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { RxExit } from "react-icons/rx";
import MenuOptions from './MenuOptions';
const Menu = () => {
  return (
    <div className='px-4 py-2 flex flex-col gap-6 h-dvh '>
      
      <div className='flex'>
        <div className='flex flex-col items-center gap-1'>
          <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" alt="profile" className='w-[60px] h-[60px] rounded-[50%]' />

        </div>
        <div className='flex flex-col justify-center px-4 '>
          <p className='text-2xl'>Mike</p>
          <p>miketheadmin@gmail.com</p>

        </div>
      </div>
     
      <div className='flex flex-col gap-6'>
        <MenuOptions icon={<MdOutlineDashboard/>} text="Dashboard"/>
        <MenuOptions icon={<FaTasks/>} text="Manage Tasks"/>
        <MenuOptions icon={<MdOutlineAddBox/>} text="Create Task"/>
        <MenuOptions icon={<GoPeople/>} text="Team Members"/>
        <MenuOptions icon={<RxExit/>} text="Logout"/>
      </div>
      <div className='flex justify-center'>
      <p className='bg-blue-500 text-white py-1 text-center w-[70px]  rounded-md text-[12px]'>Admin</p>

      </div>
    </div>
  )
}

export default Menu