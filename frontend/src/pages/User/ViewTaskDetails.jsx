"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DateFixing from "../../components/DateFixing" // Assuming this component exists and is styled
import UserLayout from "../../components/UserLayout" // Assuming this component exists and is styled
import UsersProfilePic from "../../components/UsersProfilePic" // Assuming this component exists and is styled
import axiosInstance from "../../utils/axiosInstance"
import { FiExternalLink } from "react-icons/fi" // Using react-icons as per original code
import toast from "react-hot-toast"
import { HashLoader } from "react-spinners"
// import Spinner from "../../components/Spinner"; // Spinner is not used, HashLoader is used directly

const ViewTaskDetails = () => {
  const [task, setTask] = useState(null) // Initialize as null for better loading state handling
  const [flag, setFlag] = useState(false)
  const { id: taskId } = useParams() // Destructure id from useParams
  const navigate = useNavigate()

  const fetchTaskDetails = async () => {
    try {
      const response = await axiosInstance.get(`/tasks/${taskId}`)
      setTask(response.data)
    } catch (error) {
      console.error("Error fetching task details:", error)
      toast.error("Failed to load task details.")
      setTask({}) // Set to empty object to show no data if error
    }
  }

  const getProgressColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-purple-100 text-purple-700 border-purple-300"
      case "In Progress":
        return "bg-cyan-100 text-cyan-700 border-cyan-300"
      case "Completed":
        return "bg-green-100 text-green-700 border-green-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "High":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const handleCheckbox = async (e, currentTodo) => {
    if (!task) return // Ensure task data is loaded

    const updatedTodoChecklist = task.todoChecklist.map((t) =>
      t._id === currentTodo._id ? { ...t, completed: e.target.checked } : t,
    )

    try {
      await axiosInstance.put(`/tasks/${task._id}/todo`, {
        todoChecklist: updatedTodoChecklist,
      })
      setTask((prevTask) => ({
        ...prevTask,
        todoChecklist: updatedTodoChecklist,
      }))
      toast.success("Checklist updated!")
    } catch (error) {
      console.error("Error updating checklist:", error)
      toast.error("Failed to update checklist.")
    }
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      window.open(url, "_blank")
    } catch (_) {
      toast.error("Invalid URL")
    }
  }

  useEffect(() => {
    fetchTaskDetails()
  }, [taskId.id, flag]) // Re-fetch when taskId changes or flag is toggled

  if (!task) {
    // Show loading spinner if task is null (initial state)
    return (
      <div className="flex flex-col items-center gap-4 justify-center h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <HashLoader color="#6366F1" size={60} />
        <p className="text-lg text-gray-600 font-medium animate-pulse">Loading task details...</p>
      </div>
    )
  }

  if (Object.keys(task).length === 0) {
    // Show message if task is an empty object (error state)
    return (
      <UserLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-clipboard-x mb-4 text-red-500"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <path d="M8 2h8"></path>
            <path d="m15 11-6 6"></path>
            <path d="m9 11 6 6"></path>
          </svg>
          <p className="text-xl font-semibold mb-2">Task Not Found</p>
          <p className="text-center">
            The task you are looking for might not exist or you do not have permission to view it.
          </p>
        </div>
      </UserLayout>
    )
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 space-y-6">
        {/* Task Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">{task.title}</h1>
          <span className={`px-4 py-1 rounded-full text-sm font-semibold border ${getProgressColor(task.status)}`}>
            {task.status}
          </span>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
          <p className="text-gray-800 leading-relaxed">{task.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {/* Priority */}
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-500 mb-1">Priority</p>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>

          {/* Due Date */}
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-500 mb-1">Due Date</p>
            <div className="font-semibold text-gray-800">
              <DateFixing date={task.dueDate} />
            </div>
          </div>

          {/* Assigned To */}
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-500 mb-1">Assigned To</p>
            <div>
              <UsersProfilePic checkedUsers={task.assignedTo} />
            </div>
          </div>
        </div>

        {/* Todo Checklist */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3 mt-6">Todo Checklist</h2>
          <div className="space-y-3">
            {task.todoChecklist && task.todoChecklist.length > 0 ? (
              task.todoChecklist.map((curr) => (
                <div
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                  key={curr._id}
                >
                  <input
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                    type="checkbox"
                    checked={curr.completed === true}
                    onChange={(e) => handleCheckbox(e, curr)}
                  />
                  <p className={`flex-1 text-gray-800 ${curr.completed ? "line-through text-gray-500" : ""}`}>
                    {curr.todo}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No checklist items for this task.</p>
            )}
          </div>
        </div>

        {/* Attachments */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3 mt-6">Attachments</h2>
          <div className="space-y-3">
            {task.attachments && task.attachments.length > 0 ? (
              task.attachments.map((curr, idx) => (
                <div
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                  key={idx}
                >
                  <div className="flex items-center gap-2 text-gray-800">
                    <span className="font-medium">{idx < 9 ? `0${idx + 1}` : idx + 1}.</span>
                    <p className="truncate">{curr}</p>
                  </div>
                  <div className="cursor-pointer text-blue-500 hover:text-blue-700 text-xl">
                    <FiExternalLink onClick={() => isValidUrl(curr)} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No attachments for this task.</p>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default ViewTaskDetails
