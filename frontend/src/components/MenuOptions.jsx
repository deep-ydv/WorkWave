import React, { isValidElement, useEffect } from 'react'
import { useLocation, useNavigate,} from 'react-router-dom'
import toast from 'react-hot-toast';

const MenuOptions = ({icon,text,route}) => {
  const active=useLocation().pathname;
  const navigate=useNavigate();
  const handleClick=()=>{
    if(text==="Logout"){
      //  console.log("Logout");
       toast.success("Logout Successfully");
       localStorage.removeItem("token");
       navigate("/login");
    }
    else 
    navigate(route);
  }
 
  
  return (
    <div className={`flex h-[45px] items-center cursor-pointer px-4 gap-4 text-lg ${active==route?"bg-blue-200 text-blue-600 border-r-4 border-l-blue-600":""}`} onClick={handleClick}>{icon} {text}</div>
  )
}

export default MenuOptions