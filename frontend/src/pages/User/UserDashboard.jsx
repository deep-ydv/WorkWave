"use client"

import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { HashLoader } from "react-spinners"
import GraphSection from "../../components/GraphSection"
import Greet from "../../components/Greet"
import RecentTasks from "../../components/RecentTasks"
import UserLayout from "../../components/UserLayout"
import { useUserContext } from "../../context/UserContext"
import axiosInstance from "../../utils/axiosInstance"

const UserDashboard = () => {
  const [taskDetail, setTaskDetail] = useState(null) // Initialize as null to differentiate between loading and no data
  const navigate = useNavigate()
  const { fetchData, profileData } = useUserContext()
  const [loading, setLoading] = useState(true) // Add loading state

  const fetchUserTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks/user-dashboard-data")
      setTaskDetail(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch user tasks:", error)
      toast.error("Failed to fetch user tasks.")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserTasks()
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    }
    fetchData() // Assuming fetchData also handles profileData loading
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <HashLoader color="#3b82f6" size={60} />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loading User Dashboard
          </p>
          <p className="text-sm text-gray-500">Please wait while we fetch your tasks...</p>
          <div className="flex items-center justify-center gap-1 mt-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <UserLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 md:p-6 lg:p-8">
        {/* Main Dashboard Container */}
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Header Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  My Dashboard
                </h1>
                <p className="text-gray-600">Welcome back! Here's an overview of your assigned tasks.</p>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">System Active</span>
              </div>
            </div>
          </div>

          {/* Good Morning Section */}
          {profileData && taskDetail && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <div className="bg-white rounded-xl p-6">
                  <Greet profileData={profileData} taskDetail={taskDetail} />
                </div>
              </div>
            </div>
          )}

          {/* Conditional rendering for tasks */}
          {taskDetail && taskDetail.recentTasks && taskDetail.recentTasks.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center flex flex-col items-center justify-center gap-4 min-h-[200px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clipboard-check text-gray-400"
              >
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="m9 14 2 2 4-4" />
              </svg>
              <p className="text-lg font-semibold text-gray-700">No tasks assigned to you at this moment.</p>
              <p className="text-sm text-gray-500">Check back later or contact your admin for new assignments.</p>
            </div>
          ) : (
            taskDetail && ( // Ensure taskDetail is not null before rendering these sections
              <>
                {/* Graph Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-1">
                    <div className="bg-white rounded-xl p-6">
                      <div className="mb-6">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                          Your Task Analytics
                        </h2>
                        <p className="text-gray-600 text-sm">Track your personal task distribution and priorities.</p>
                      </div>
                      <GraphSection taskDetail={taskDetail} />
                    </div>
                  </div>
                </div>

                {/* Recent Tasks Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                    <div className="bg-white rounded-xl p-6">
                      <div className="mb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                              Your Recent Tasks
                            </h2>
                            <p className="text-gray-600 text-sm">Latest activities and updates on your tasks.</p>
                          </div>
                          <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            Live Updates
                          </div>
                        </div>
                      </div>
                      <RecentTasks recentTasks={taskDetail.recentTasks} />
                    </div>
                  </div>
                </div>
              </>
            )
          )}

          {/* Bottom Decoration */}
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              <span className="text-sm text-gray-600 font-medium">TaskWave User Dashboard</span>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </UserLayout>
  )
}

export default UserDashboard
