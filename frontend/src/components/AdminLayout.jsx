import React, { useEffect, useState } from 'react'
import { FaTasks } from 'react-icons/fa'
import { GoPeople } from 'react-icons/go'
import { MdOutlineAddBox, MdOutlineDashboard, MdMenu, MdClose } from 'react-icons/md'
import { RxExit } from 'react-icons/rx'
import { useAdminContext } from '../context/AdminContext'
import MenuOptions from './MenuOptions'

const AdminLayout = ({children}) => {
  const { profileData, loading, error } = useAdminContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if(loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50'>
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading your workspace...</p>
        </div>
      </div>
    )
  }

  if(error) {
    return (
      <div className='w-full h-screen flex justify-center items-center bg-gradient-to-br from-red-50 to-pink-50'>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100">
          <div className="text-red-500 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-lg font-semibold">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="flex fixed w-full z-50 items-center justify-between px-6 bg-white/90 backdrop-blur-md h-16 border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-4">
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TW</span>
            </div>
            <p className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Task Wave
            </p>
          </div>
        </div>
        
        {/* Mobile profile indicator */}
        {/* <div className="lg:hidden flex items-center space-x-2">
          <img 
            src={profileData.profileImageUrl || "https://e7.pngegg.com/pngimages/507/702/png-clipart-profile-icon-simple-user-icon-icons-logos-emojis-users-thumbnail.png"} 
            alt="profile" 
            className="w-8 h-8 rounded-full border-2 border-blue-200" 
          />
        </div> */}
        <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <MdClose className="text-xl" /> : <MdMenu className="text-xl" />}
          </button>
      </div>

      <div className='flex'>
        {/* Sidebar */}
        <div className={`
          bg-white/95 backdrop-blur-md w-76 h-screen pt-20 fixed z-40 transition-transform duration-300 ease-in-out border-r border-gray-200 shadow-xl
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Profile Section */}
          <div className="flex flex-col justify-center items-center py-8 px-6">
            <div className="relative group">
              <img 
                src={profileData.profileImageUrl || "https://e7.pngegg.com/pngimages/507/702/png-clipart-profile-icon-simple-user-icon-icons-logos-emojis-users-thumbnail.png"} 
                alt="profileImg" 
                className="w-20 h-20 rounded-full border-4 border-blue-200 shadow-lg group-hover:border-blue-300 transition-colors" 
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            
            <div className="mt-4 text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm mb-3">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                Admin
              </div>
              <p className="font-bold text-lg text-gray-800 mb-1">{profileData.name}</p>
              <p className="text-gray-600 text-sm">{profileData.email}</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="px-4 space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
              Navigation
            </div>
            
            <MenuOptions 
              icon={<MdOutlineDashboard className="text-lg"/>} 
              text="Dashboard" 
              route="/admin/dashboard" 
            />
            <MenuOptions 
              icon={<FaTasks className="text-lg"/>} 
              text="Manage Tasks" 
              route="/admin/tasks"
            />
            <MenuOptions 
              icon={<MdOutlineAddBox className="text-lg"/>} 
              text="Create Task" 
              route="/admin/create-task"
            />
            <MenuOptions 
              icon={<GoPeople className="text-lg"/>} 
              text="Team Members" 
              route="/admin/users"
            />
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              <MenuOptions 
                icon={<RxExit className="text-lg"/>} 
                text="Logout"
              />
            </div>
          </div>

          {/* Bottom decoration */}
          {/* <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🚀</div>
              <p className="text-sm font-medium text-gray-700">Boost your productivity</p>
              <p className="text-xs text-gray-500 mt-1">Manage tasks efficiently</p>
            </div>
          </div> */}
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className='pt-20 lg:pl-80 w-full px-6 pb-6 min-h-screen'>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout