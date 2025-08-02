import React from 'react'
import { Toaster } from 'react-hot-toast'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import CreateTask from './pages/Admin/CreateTask'
import Dashboard from './pages/Admin/Dashboard'
import ManageTasks from './pages/Admin/ManageTasks'
import ManageUsers from './pages/Admin/ManageUsers'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/LandingPage/Home'
import MyTasks from './pages/User/MyTasks'
import UserDashboard from './pages/User/UserDashboard'
import ViewTaskDetails from './pages/User/ViewTaskDetails'
import PrivateRoute from './routes/PrivateRoute'
import AnyUrl from './components/AnyUrl'
import UpdateTaskDetails from './components/UpdateTaskDetails'
import Unauthorized from './components/Unauthorized'
import NotFound from './routes/NotFound'
// import AI from './TaskWaveLanding.jsx'
import TaskWaveLanding from './components/TaskWaveLanding'
const App = () => {
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}/>

      <Router>
        <Routes>
          <Route path='/' element={<TaskWaveLanding/>}/>
          <Route path="*" element={<NotFound/>} />
         
          {/* Auth Routes */}
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

          {/* Admin Routes */}
          {/* <Route element={<PrivateRoute allowedRoles={"admin"}/>}> */}
          <Route element={<PrivateRoute allowedRoles={"admin"}/>}>
            <Route path='/admin/dashboard' element={<Dashboard/>}/>
            <Route path='/admin/tasks' element={<ManageTasks/>}/>
            <Route path='/admin/create-task' element={<CreateTask/>}/>
            <Route path='/admin/users' element={<ManageUsers/>}/>
            <Route path='/admin/update-task-details/:id' element={<UpdateTaskDetails/>}/>

          </Route>

          {/* User Routes */}
          {/* <Route element={<PrivateRoute allowedRoles={"member"}/>}> */}
          <Route element={<PrivateRoute allowedRoles={"member"}/>}>
            <Route path='/user/dashboard' element={<UserDashboard/>}/>
            <Route path='/user/tasks' element={<MyTasks/>}/>
            <Route path='/user/task-details/:id' element={<ViewTaskDetails/>}/>
          </Route>

        </Routes>
      </Router>

    </div>
  )
}

export default App