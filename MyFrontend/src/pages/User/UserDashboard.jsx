import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
const UserDashboard = () => {
  const navigate=useNavigate();
  
  const handleLogout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.reload();
  }
  useEffect (()=>{
    const token=localStorage.getItem('token');
    if(!token){
      navigate("/login");
    }
  },[])
  return (
    <div>
       <h2>UserDashboard</h2>
       <button onClick={(e)=>handleLogout(e)}>Logout</button>

    </div>
  )
}

export default UserDashboard