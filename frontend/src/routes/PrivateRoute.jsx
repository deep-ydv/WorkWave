import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRoute = ({allowrdRoles}) => {
  return <Outlet/>
}

export default PrivateRoute