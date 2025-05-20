import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex w-full h-screen '>
      <div className='flex flex-col w-[60%] p-8 justify-between'>
        <div>
        <h2 className='font-semibold text-xl'>Work Wave</h2>
        </div>
        <div className='mb-6'>
        {children}
        </div>
      </div>

      <div className='w-[40%]'>
        <img className='w-full h-full' src="/UI_IMG.png" alt="Image" />
      </div>
    </div>
  )
}

export default AuthLayout