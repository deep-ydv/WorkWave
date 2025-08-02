"use client"

import { useEffect, useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import { ImAttachment, ImCancelCircle } from "react-icons/im"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import UsersProfilePic from "./UsersProfilePic" // Assuming this component exists and is styled
import AdminLayout from "./AdminLayout" // Assuming this component exists and is styled
import { useAdminContext } from "../context/AdminContext" // Assuming this context exists
import axiosInstance from "../utils/axiosInstance" // Assuming this utility exists
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { HashLoader } from "react-spinners"

const UpdateTaskDetails = () => {
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState(false)
  const [checkedUsers, setCheckedUsers] = useState([])
  const [hidden, setHidden] = useState(true) // For user selection modal
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState("")
  const [attach, setAttach] = useState([])
  const [attachmentText, setAttachmentText] = useState("")
  const [adminId, setAdminId] = useState("")
  const [token, setToken] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low", // Default priority
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  })

  const { id } = useParams()
  const navigate = useNavigate()
  const { usersData } = useAdminContext() // Assuming usersData is available from context

  const fetchingTaskDetails = async () => {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`)
      const taskData = response.data

      setFormData({
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString().split("T")[0] : "",
        assignedTo: taskData.assignedTo,
        todoChecklist: taskData.todoChecklist,
        attachments: taskData.attachments,
      })
      setAttach(taskData.attachments)
      setTodos(taskData.todoChecklist)
      setCheckedUsers(taskData.assignedTo)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching task details:", error)
      toast.error("Failed to load task details.")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchingTaskDetails()
  }, [id]) // Re-fetch if task ID changes

  const handleDeleteTask = () => {
    setDeleteMessage(true)
  }

  const handleDeleteCancel = () => {
    setDeleteMessage(false)
  }

  const handleTaskDelete = async () => {
    try {
      await axiosInstance.delete(`/tasks/${id}`)
      toast.success("Task Deleted Successfully")
      navigate("/admin/tasks")
    } catch (error) {
      console.error("Error deleting task:", error)
      toast.error("Failed to delete task.")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTodoEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTodo()
    }
  }

  const handleAttachmentEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAttachment()
    }
  }

  const handleCheck = (e, user) => {
    if (e.target.checked) {
      setCheckedUsers((prev) => [...prev, user])
    } else {
      const newArr = checkedUsers.filter((curr) => curr._id !== user._id)
      setCheckedUsers(newArr)
    }
  }

  const handleCancel = () => {
    setHidden((prev) => !prev)
  }

  const handleAddTodo = () => {
    if (todoText.trim() !== "") {
      setTodos((prevItems) => [...prevItems, { todo: todoText.trim(), completed: false }])
      setTodoText("")
    }
  }

  const handleDeleteTodo = (e, idx) => {
    const newArr = todos.filter((_, i) => i !== idx)
    setTodos(newArr)
  }

  const handleAttachment = () => {
    if (attachmentText.trim() !== "") {
      setAttach((prevItems) => [...prevItems, attachmentText.trim()])
      setAttachmentText("")
    }
  }

  const handleDeleteAttachment = (e, idx) => {
    const newArr = attach.filter((_, i) => i !== idx)
    setAttach(newArr)
  }

  const url = import.meta.env.VITE_SERVER_URL // Assuming VITE_SERVER_URL is correctly configured

  const handleUpdateTask = async () => {
    // Basic validation
    if (!formData.title.trim()) {
      toast.error("Task title is required")
      return
    }
    if (!formData.description.trim()) {
      toast.error("Description is required")
      return
    }
    if (!formData.dueDate) {
      toast.error("Due date is required")
      return
    }
    const today = new Date()
    const dueDate = new Date(formData.dueDate)
    today.setHours(0, 0, 0, 0)
    dueDate.setHours(0, 0, 0, 0)

    if (dueDate < today) {
      toast.error("Due date cannot be before today")
      return
    }
    if (checkedUsers.length === 0) {
      toast.error("Please assign the task to at least one member")
      return
    }
    if (todos.length === 0) {
      toast.error("Please assign at least one todo item")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await axios.put(
        `${url}/api/tasks/${id}`,
        {
          title: formData.title,
          description: formData.description,
          priority: formData.priority || "Low",
          dueDate: formData.dueDate,
          assignedTo: formData.assignedTo,
          attachments: formData.attachments,
          todoChecklist: formData.todoChecklist,
          createdBy: adminId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.status === 200) {
        toast.success("Task Updated Successfully")
        navigate("/admin/tasks")
      }
    } catch (error) {
      console.error("Error updating task:", error.response?.data?.message || error.message)
      toast.error(error.response?.data?.message || "Failed to update task")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const localtoken = localStorage.getItem("token")
    if (localtoken) {
      setToken(localtoken)
      const decode = jwtDecode(localtoken)
      setAdminId(decode.id)
    }

    const checkBoxIds = checkedUsers.map((curr) => curr._id)
    setFormData((prev) => ({ ...prev, assignedTo: checkBoxIds }))
    setFormData((prev) => ({ ...prev, todoChecklist: todos }))
    setFormData((prev) => ({ ...prev, attachments: attach }))
  }, [checkedUsers, todos, attach])

  if (loading)
    return (
      <div className="flex flex-col items-center gap-2 justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <HashLoader color="#0906ef" size={50} />
        <p className="text-sm text-gray-500 animate-pulse">Loading task details, please wait...</p>
      </div>
    )

  return (
    <AdminLayout>
      {/* Delete Confirmation Modal */}
      {deleteMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-2xl flex flex-col items-center gap-6 border-t-4 border-red-500">
            <p className="text-xl font-semibold text-gray-800 text-center">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-center gap-4 w-full">
              <button
                className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all shadow-sm"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-md"
                onClick={handleTaskDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Selection Modal */}
      {!hidden && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl flex flex-col">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
              <p className="text-lg font-semibold text-gray-800">Select Members</p>
              <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700 transition-colors">
                <ImCancelCircle className="text-2xl" />
              </button>
            </div>
            <div className="h-[420px] overflow-y-auto pr-2 custom-scrollbar">
              {usersData.length > 0 ? (
                usersData.map((user, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                        {user.profileImageUrl ? (
                          <img
                            src={user.profileImageUrl || "/placeholder.svg"}
                            alt="profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaUserCircle className="w-full h-full text-gray-400" />
                        )}
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        checked={checkedUsers.some((u) => u._id === user._id)}
                        onChange={(e) => handleCheck(e, user)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-10">No users available.</p>
              )}
            </div>
            <div className="flex justify-end pt-4 mt-4 border-t border-gray-200">
              <button
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
                onClick={handleCancel}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Actual Component Content */}
      <div className="bg-white p-6 md:p-8 w-full max-w-4xl mx-auto rounded-2xl shadow-lg flex flex-col gap-6">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">Update Task</h1>
          <button
            onClick={handleDeleteTask}
            className="px-4 py-2 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-all shadow-sm"
          >
            Delete Task
          </button>
        </div>

        {/* Task Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe Task"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px]"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Priority, Due Date, Assign To */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="assignTo" className="block text-sm font-medium text-gray-700 mb-1">
              Assign To
            </label>
            <div
              className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-all min-h-[48px]"
              onClick={handleCancel}
            >
              {checkedUsers.length > 0 ? (
                <UsersProfilePic checkedUsers={checkedUsers} />
              ) : (
                <button type="button" className="text-gray-600 font-medium">
                  Add Members
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Todo Checklist */}
        <div className="w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Todo Checklist</h2>
          <div className="flex w-full gap-2 mb-3">
            <input
              type="text"
              placeholder="Enter Task"
              value={todoText}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              onChange={(e) => setTodoText(e.target.value)}
              onKeyDown={handleTodoEnter}
            />
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
              onClick={handleAddTodo}
            >
              + Add
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {todos.length > 0 ? (
              todos.map((curr, idx) => (
                <div
                  className="w-full p-3 border border-gray-200 rounded-lg flex justify-between items-center bg-gray-50 text-gray-800 shadow-sm"
                  key={idx}
                >
                  <div className="flex gap-3 items-center">
                    <p className="text-sm font-mono text-gray-500">{idx < 9 ? `0${idx + 1}` : idx + 1}.</p>
                    <p className="font-medium">{curr.todo}</p>
                  </div>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                    onClick={(e) => handleDeleteTodo(e, idx)}
                  >
                    <ImCancelCircle />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No todo items added yet.</p>
            )}
          </div>
        </div>

        {/* Add Attachments */}
        <div className="w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Attachments</h2>
          <div className="flex w-full gap-2 mb-3">
            <input
              type="text"
              placeholder="Enter File Link"
              value={attachmentText}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              onChange={(e) => setAttachmentText(e.target.value)}
              onKeyDown={handleAttachmentEnter}
            />
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
              onClick={handleAttachment}
            >
              + Add
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {attach.length > 0 ? (
              attach.map((attachment, idx) => (
                <div
                  className="w-full p-3 border border-gray-200 rounded-lg flex justify-between items-center bg-gray-50 text-gray-800 shadow-sm"
                  key={idx}
                >
                  <div className="flex gap-3 items-center">
                    <ImAttachment className="text-lg text-gray-500" />
                    <p className="font-medium truncate">{attachment}</p>
                  </div>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                    onClick={(e) => handleDeleteAttachment(e, idx)}
                  >
                    <ImCancelCircle />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No attachments added yet.</p>
            )}
          </div>
        </div>

        {/* Update Task Button */}
        <button
          type="button"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all mt-6 shadow-md flex items-center justify-center gap-2"
          onClick={handleUpdateTask}
          disabled={isSubmitting}
        >
          {isSubmitting && <HashLoader color="#fff" size={20} />}
          {isSubmitting ? "Updating Task..." : "Update Task"}
        </button>
      </div>
    </AdminLayout>
  )
}

export default UpdateTaskDetails
