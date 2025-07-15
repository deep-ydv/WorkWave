import React from 'react'
import { useAdminContext } from '../context/AdminContext'

const AuthLayout = ({children}) => {

 

  return (
    <div className='w-full h-[100dvh] border-0 border-red-600 sm:h-full md:flex lg:h-screen'>
      <div className='border-0 border-green-600 md:w-[50%] lg:w-[60%]'>
        <div>
        <h2 className='px-4 flex items-center font-semibold text-xl border-0 border-blue-600 h-[50px]'>Work Wave</h2>
        </div>
        <div className='flex  border-0 border-blue-600 h-[calc(100dvh-63px)] sm:h-[calc(100vh-50px)' >
        {children}
        </div>
      </div>

      <div className='border-0 border-green-600 hidden md:block md:w-[50%] lg:w-[40%] lg:h-full'>
        <img className='w-full h-full' src="/UI_IMG.png" alt="Image" />
      </div>
    </div>
  )
}

export default AuthLayout