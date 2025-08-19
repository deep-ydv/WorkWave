"use client"

import { useEffect, useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { FaUserCircle } from "react-icons/fa"
import { useAdminContext } from "../../context/AdminContext"
import { ImAttachment, ImCancelCircle } from "react-icons/im"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import UsersProfilePic from "../../components/UsersProfilePic"
import toast from "react-hot-toast"
import { HashLoader } from "react-spinners" // Assuming Spinner is HashLoader
import { IoIosCloseCircleOutline } from "react-icons/io"

const CreateTask = () => {
  const [checkedUsers, setCheckedUsers] = useState([])
  const [isUserSelectionModalOpen, setIsUserSelectionModalOpen] = useState(false)
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState("")
  const [attachments, setAttachments] = useState([])
  const [attachmentText, setAttachmentText] = useState("")
  const [adminId, setAdminId] = useState("")
  const [token, setToken] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false) // New state for submission loading
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low", // Default to Low
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const { usersData } = useAdminContext()
  const handleHowToUse = () => {
    setIsUserSelectionModalOpen((prev) => !prev)
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
      handleAddAttachment()
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

  const toggleUserSelectionModal = () => {
    setIsUserSelectionModalOpen((prev) => !prev)
  }

  const handleAddTodo = () => {
    if (todoText.trim() !== "") {
      setTodos((prevItems) => [...prevItems, { todo: todoText.trim(), completed: false }])
      setTodoText("")
    }
  }

  const handleDeleteTodo = (idx) => {
    setTodos((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleAddAttachment = () => {
    if (attachmentText.trim() !== "") {
      setAttachments((prevItems) => [...prevItems, attachmentText.trim()])
      setAttachmentText("")
    }
  }

  const handleDeleteAttachment = (idx) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx))
  }

  const url = import.meta.env.VITE_SERVER_URL // Ensure this env variable is correctly configured

  const handleCreateTask = async () => {
    setIsSubmitting(true) // Start loading

    // Basic validation
    if (!formData.title.trim()) {
      toast.error("Task title is required")
      setIsSubmitting(false)
      return
    }
    if (!formData.description.trim()) {
      toast.error("Description is required")
      setIsSubmitting(false)
      return
    }
    if (!formData.dueDate) {
      toast.error("Due date is required")
      setIsSubmitting(false)
      return
    }
    const today = new Date()
    const dueDate = new Date(formData.dueDate)
    today.setHours(0, 0, 0, 0)
    dueDate.setHours(0, 0, 0, 0)

    if (dueDate < today) {
      toast.error("Due date cannot be before today")
      setIsSubmitting(false)
      return
    }
    if (checkedUsers.length === 0) {
      toast.error("Please assign the task to at least one member")
      setIsSubmitting(false)
      return
    }
    if (todos.length === 0) {
      toast.error("Please add at least one todo item to the checklist")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await axios.post(
        `${url}/api/tasks/`,
        {
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
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

      if (response.status === 201) {
        toast.success("Task Created Successfully!")
        // Reset all fields
        setFormData({
          title: "",
          description: "",
          priority: "Low",
          dueDate: "",
          assignedTo: [],
          todoChecklist: [],
          attachments: [],
        })
        setCheckedUsers([])
        setTodos([])
        setAttachments([])
        setTodoText("")
        setAttachmentText("")
      }
    } catch (error) {
      console.error("Failed to create task:", error.response?.data?.message || error.message)
      toast.error(error.response?.data?.message || "Failed to create task")
    } finally {
      setIsSubmitting(false) // End loading
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
    setFormData((prev) => ({ ...prev, attachments: attachments }))
  }, [checkedUsers, todos, attachments])

  return (
    <AdminLayout>
      {/* User Selection Modal */}
      {isUserSelectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl flex flex-col">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Select Team Members</h2>
              <button
                onClick={toggleUserSelectionModal}
                className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer text-2xl"
              >
                <IoIosCloseCircleOutline />
              </button>
            </div>
            <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {usersData && usersData.length > 0 ? (
                usersData.map((user, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
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
                        checked={checkedUsers.some((u) => u._id === user._id)}
                        onChange={(e) => handleCheck(e, user)}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No team members available.</p>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={toggleUserSelectionModal}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Create Task Form */}
      <div className="w-full max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center lg:text-left">Create New Task</h1>

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
          {/* Priority */}
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

          {/* Due Date */}
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

          {/* Assign To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
            <div
              className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors min-h-[48px]"
              onClick={toggleUserSelectionModal}
            >
              {checkedUsers.length > 0 ? (
                <UsersProfilePic checkedUsers={checkedUsers} />
              ) : (
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Add Members
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Todo Checklist */}
        <div className="w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Todo Checklist</h2>
          <div className=" flex gap-2 mb-4 flex-wrap">
            <input
              type="text"
              placeholder="Enter Todo Item"
              value={todoText}
              className="w-[30%] flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              onChange={(e) => setTodoText(e.target.value)}
              onKeyDown={handleTodoEnter}
            />
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex-shrink-0"
              onClick={handleAddTodo}
            >
              + Add
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {todos.length > 0 ? (
              todos.map((curr, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium text-gray-600">{idx < 9 ? `0${idx + 1}` : idx + 1}.</p>
                    <p className="text-base">{curr.todo}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(idx)}
                    className="text-red-500 hover:text-red-700 cursor-pointer text-xl transition-colors"
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
          <h2 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Add Attachments</h2>
          <div className="flex gap-2 mb-4 flex-wrap">
            <input
              type="text"
              placeholder="Enter File Link (e.g., Google Drive, Dropbox URL)"
              value={attachmentText}
              className="w-[30%] flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              onChange={(e) => setAttachmentText(e.target.value)}
              onKeyDown={handleAttachmentEnter}
            />
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex-shrink-0"
              onClick={handleAddAttachment}
            >
              + Add
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {attachments.length > 0 ? (
              attachments.map((attachment, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <ImAttachment className="text-blue-500 text-lg" />
                    <p className="text-base truncate">{attachment}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteAttachment(idx)}
                    className="text-red-500 hover:text-red-700 cursor-pointer text-xl transition-colors"
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

        {/* Create Task Button */}
        <button
          type="button"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all mt-6 shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handleCreateTask}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <HashLoader color="#fff" size={20} />
              Creating Task...
            </>
          ) : (
            "Create Task"
          )}
        </button>
      </div>
    </AdminLayout>
  )
}

export default CreateTask
