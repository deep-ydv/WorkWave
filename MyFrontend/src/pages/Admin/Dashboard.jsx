import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
const Dashboard = () => {
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
    <div>Dashboard
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard