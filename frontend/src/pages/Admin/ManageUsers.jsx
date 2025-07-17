import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import ExcelReport from '../../components/ExcelReport'
import Spinner from '../../components/Spinner'
import UserCard from '../../components/UserCard'
import { useAdminContext } from '../../context/AdminContext'
import {HashLoader} from 'react-spinners'

const ManageUsers = () => {
  const {loading}=useAdminContext()
  useEffect(() => {
    // console.log("I M ManageTaskCard.jsx");
  
  }, [])
  if(loading) return <div className="flex flex-col items-center gap-2 justify-center h-screen">
  {/* <Spinner /> */}
  <HashLoader color="#0906ef"/>
  <p className="text-sm text-gray-500">Loading, please wait...</p>
</div>
  return (
    <AdminLayout>
      <div className='p-4 bg-white rounded-md flex flex-col gap-4'>
        <div className='flex justify-between'>
         <p className='font-semibold text-xl'>Team Members</p> 
         <ExcelReport temp="users"/>
         
        </div>

        <div>
          <UserCard />
        </div>
        
      </div>
    </AdminLayout>
  )
}

export default ManageUsers