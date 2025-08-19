"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HashLoader } from "react-spinners"
import { Toaster } from "react-hot-toast"
import RecentTasks from "../../components/RecentTasks"
import AdminLayout from "../../components/AdminLayout"
import { useAdminContext } from "../../context/AdminContext"
import Greet from "../../components/Greet"
import GraphSection from "../../components/GraphSection"
import Loading from "../../components/Loading"


const Dashboard = () => {
  const navigate = useNavigate()
  const { profileData, taskDetails, fetchData, loading } = useAdminContext()

  useEffect(() => {
    fetchData()
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    }
  }, [])

  if (loading) {
    return (
      <Loading/>
    )
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50  md:p-6 lg:p-8">
        {/* Main Dashboard Container */}
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Header Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard Overview
                </h1>
                <p className="text-gray-600">Welcome back! Here's what's happening with your tasks today.</p>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">System Active</span>
              </div>
            </div>
          </div>

          {/* Good Morning Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="bg-white rounded-xl p-6">
                <Greet profileData={profileData} taskDetail={taskDetails} />
              </div>
            </div>
          </div>

          {/* Graph Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-1">
              <div className="bg-white rounded-xl p-6">
                {/* <div className="mb-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    Analytics & Insights
                  </h2>
                  <p className="text-gray-600 text-sm">Track your team's performance and task distribution</p>
                </div> */}
                <GraphSection taskDetail={taskDetails} />
              </div>
            </div>
          </div>

          {/* Recent Tasks Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="bg-white rounded-xl ">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    {/* <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Recent Tasks
                      </h2>
                      <p className="text-gray-600 text-sm">Latest task activities and updates</p>
                    </div> */}
                    {/* <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Live Updates
                    </div> */}
                  </div>
                </div>
                <RecentTasks recentTasks={taskDetails.recentTasks} />
              </div>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              <span className="text-sm text-gray-600 font-medium">TaskWave Dashboard</span>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      {/* <Toaster
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
      /> */}
    </AdminLayout>
  )
}

export default Dashboard
