"use client"

import { useEffect, useState } from "react"
import { FaTasks } from "react-icons/fa"
import { MdOutlineDashboard } from "react-icons/md"
import { RxExit } from "react-icons/rx"
import { useUserContext } from "../context/UserContext"
import MenuOptions from "./MenuOptions"
import { Menu, X } from "lucide-react" // Import Lucide icons

const UserLayout = ({ children }) => {
  const { profileData, fetchData } = useUserContext()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Toggle sidebar visibility for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Close sidebar when navigating or on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Tailwind's 'lg' breakpoint
        setIsSidebarOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // You might want to uncomment fetchData if it's needed for initial profile data
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // Placeholder for loading/error states if useUserContext provides them
  // if (loading) return <div className='w-full h-screen flex justify-center items-center'>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-110 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 ">
        <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Task Wave
        </p>
        {/* Hamburger menu for mobile */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="absolute z-100 sm:fixed">
          <div
          className={`fixed top-0 left-0 h-screen pt-16 bg-white/90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 ease-in-out
            ${isSidebarOpen ? "w-64" : "w-0"}
            lg:w-[18%] lg:translate-x-0
            overflow-hidden lg:overflow-visible
          `}
        >
          <div className="flex flex-col justify-center items-center py-6 border-b border-gray-100">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400 shadow-md group">
              <img
                src={
                  profileData?.profileImageUrl ||
                  "https://e7.pngegg.com/pngimages/507/702/png-clipart-profile-icon-simple-user-icon-icons-logos-emojis-users-thumbnail.png"
                }
                alt="profileImg"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <p className="mt-4 px-4 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm">
              User
            </p>
            <p className="font-bold text-lg mt-3 text-gray-900">{profileData?.name || "User Name"}</p>
            <p className="text-sm text-gray-600">{profileData?.email || "user@example.com"}</p>
          </div>
          <div className="flex flex-col gap-2 font-semibold pt-6 px-4">
            <MenuOptions icon={<MdOutlineDashboard className="h-5 w-5" />} text="Dashboard" route="/user/dashboard" />
            <MenuOptions icon={<FaTasks className="h-5 w-5" />} text="My Tasks" route="/user/tasks" />
            <div className="mt-auto pt-4 border-t border-gray-100">
              <MenuOptions icon={<RxExit className="h-5 w-5" />} text="Logout" route="/logout" />{" "}
              {/* Assuming /logout handles logout */}
            </div>
          </div>
          {/* Decorative bottom card */}
          {/* <div className="absolute bottom-0 left-0 w-full p-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-4 text-white shadow-lg text-center">
              <p className="text-sm font-semibold">TaskWave Pro</p>
              <p className="text-xs mt-1">Unlock advanced features!</p>
            </div>
          </div> */}
        </div>
        </div>


        {/* Main Content Area */}
        <div
        className={`p-4 pt-20 w-full ml-0 lg:ml-[18%] `}
        //   className={`flex-1 pt-20 p-4 transition-all duration-300 ease-in-out
        //   ${isSidebarOpen ? "ml-64 lg:ml-[18%]" : "ml-0 lg:ml-[18%]"}
        // `}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default UserLayout
