import React, { isValidElement, useEffect } from 'react'
import { useLocation, useNavigate,} from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAdminContext } from '../context/AdminContext';

const MenuOptions = ({icon,text,route}) => {
  
  const active=useLocation().pathname;
  const parts = active.split("/");
const segment = parts[2]; // "update-task-details"
  // console.log(segment)
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
    <div className={`flex h-[45px] items-center cursor-pointer px-4 gap-4 text-lg ${active==route || (segment=="update-task-details" && text=="Manage Tasks") || (segment=="task-details" && text=="My Tasks")?"bg-blue-200 text-blue-600 border-r-4 border-l-blue-600":""}`} onClick={handleClick}>{icon} {text}</div>
  )
}

export default MenuOptions