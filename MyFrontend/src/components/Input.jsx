import React from 'react'

const Input = ({type,placeholder,Label,setField}) => {
  return (
    <div className='flex flex-col w-[48%] gap-2'>
    <label className='font-semibold'>{Label}</label>
    <input className='border-1 px-3 py-2 rounded-sm border-gray-400 bg-gray-100 text-[16px]' type={type} placeholder={placeholder} onChange={(e)=>setField(e.target.value)}/>
    </div>
  )
}

export default Input