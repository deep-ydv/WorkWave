import React from 'react'

const Input = ({type,placeholder,Label,setField,auth}) => {
  return (
    <div className={`flex flex-col gap-2  border- ${auth==="signup"?"md:w-[45%] lg:w-[47%]":""}`}>
    <label className='font-semibold text-white'>{Label}</label>
    <input  className='border-1 px-3 py-2 rounded-sm border-gray-400 bg-gray-100 text-[16px] ' type={type} placeholder={placeholder} onChange={(e)=>setField(e.target.value.trim())}/>
    </div>
  )
}

export default Input