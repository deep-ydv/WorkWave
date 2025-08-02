import React, { useEffect, useState } from 'react'
import { ImAttachment } from 'react-icons/im'
import { FiCalendar, FiUsers, FiClock } from 'react-icons/fi'
import { BsCheckCircle, BsCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import DateFixing from './DateFixing'
import ProfilePicWithId from './ProfilePicWithId'
import TaskDoneLoader from './TaskDoneLoader'
import UsersProfilePic from './UsersProfilePic'
import TaskCardSkeleton from './TaskCardSkeleton'

const ManageTaskCard = ({taskId, role}) => {
  const [completedTask, setCompletedTask] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const getProgressStyle = (p) => {
    if (p === "Pending") return "text-purple-700 bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300";
    else if (p === "In Progress") return "text-cyan-700 bg-gradient-to-r from-cyan-100 to-cyan-200 border-cyan-300";
    else if (p === "Completed") return "text-green-700 bg-gradient-to-r from-green-100 to-green-200 border-green-300";
  }
   
  const getPriorityStyle = (p) => {
    if (p === "Low") return "text-cyan-700 bg-gradient-to-r from-cyan-50 to-cyan-100 border-cyan-200";
    else if (p === "Medium") return "text-yellow-700 bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200";
    else if (p === "High") return "text-red-700 bg-gradient-to-r from-red-50 to-red-100 border-red-200";
    else return "text-gray-700 bg-gray-100";
  }

  const getSideBorderColor = (p) => {
    if (p === "Pending") return "border-l-purple-500";
    else if (p === "In Progress") return "border-l-cyan-500";
    else if (p === "Completed") return "border-l-green-500";
  }

  const getCardGradient = (status) => {
    if (status === "Pending") return "from-purple-50/50 to-white";
    else if (status === "In Progress") return "from-cyan-50/50 to-white";
    else if (status === "Completed") return "from-green-50/50 to-white";
    return "from-gray-50/50 to-white";
  }
    
  const navigate = useNavigate();
  
  const handleViewTask = () => {
    if (role === "admin") navigate(`/admin/update-task-details/${taskId}`);
    else navigate(`/user/task-details/${taskId}`);
  }
    
  const [task, setTask] = useState([]);
  
  const fetchTaskById = async () => {
    try {
      const response = await axiosInstance.get(`/tasks/${taskId}`);
      setTask(response.data);
      let completed = 0;
      response.data.todoChecklist?.forEach((t) => {
        if (t.completed === true) completed++;
      });
      setCompletedTask(completed);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTaskById();
  }, []);

  const getDaysUntilDue = () => {
    if (!task.dueDate) return null;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const daysUntilDue = getDaysUntilDue();
      
  return (
    <>
      {Object.entries(task).length <= 0 ? (
        <TaskCardSkeleton />
      ) : (
        <div 
          onClick={handleViewTask} 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative overflow-hidden cursor-pointer
            w-full sm:w-[48%] lg:w-[32%] xl:w-[32%]
            bg-gradient-to-br ${getCardGradient(task.status)}
            backdrop-blur-sm border border-white/20
            rounded-2xl shadow-lg hover:shadow-2xl
            transition-all duration-300 ease-in-out
            ${isHovered ? 'transform scale-105 -translate-y-2' : ''}
            group
          `}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-400/10 to-blue-400/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex flex-col gap-4 p-6">
            {/* Header with status and priority */}
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <span className={`
                ${getProgressStyle(task.status)} 
                px-3 py-1.5 rounded-full text-xs font-semibold
                border backdrop-blur-sm
                transition-all duration-200
              `}>
                {task.status}
              </span>
              <span className={`
                ${getPriorityStyle(task.priority)} 
                px-3 py-1.5 rounded-full text-xs font-semibold
                border backdrop-blur-sm
                transition-all duration-200
              `}>
                {task.priority} Priority
              </span>
              
              {/* Due date indicator */}
              {daysUntilDue !== null && (
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${daysUntilDue < 0 
                    ? 'text-red-700 bg-red-100 border-red-200' 
                    : daysUntilDue <= 3 
                    ? 'text-orange-700 bg-orange-100 border-orange-200'
                    : 'text-blue-700 bg-blue-100 border-blue-200'
                  }
                  border backdrop-blur-sm
                `}>
                  <FiClock className="inline w-3 h-3 mr-1" />
                  {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)}d overdue` : `${daysUntilDue}d left`}
                </span>
              )}
            </div>

            {/* Task content */}
            <div className={`${getSideBorderColor(task.status)} border-l-4 pl-4 flex flex-col gap-2`}>
              <h3 className="font-bold text-lg text-gray-800 capitalize leading-tight group-hover:text-gray-900 transition-colors">
                {task.title}
              </h3>
              <p className="text-gray-600 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
  {task.description}
</p>
              
              {/* Progress bar */}
              <div className="mt-2">
                <TaskDoneLoader taskDone={completedTask} total={task.todoChecklist?.length || 0} />
              </div>
            </div>

            {/* Dates section */}
            <div className="flex justify-between text-sm gap-8 flex-wrap">
  <div className="space-y-1">
    <p className="text-gray-500 font-medium flex items-center gap-1">
      <FiCalendar className="w-3 h-3" />
      Start Date
    </p>
    <div className="text-gray-700 font-semibold">
      <DateFixing date={task.createdAt?.slice(0, 10)} />
    </div>
  </div>

  <div className="space-y-1">
    <p className="text-gray-500 font-medium flex items-center gap-1">
      <FiCalendar className="w-3 h-3" />
      Due Date
    </p>
    <div className="text-gray-700 font-semibold">
      <DateFixing date={task.dueDate?.slice(0, 10)} />
    </div>
  </div>
</div>


            {/* Footer with assignees and attachments */}
            {/* <div className="flex justify-between items-center pt-2 border-t border-gray-200/50">
              <div className="flex items-center gap-2">
                <FiUsers className="w-4 h-4 text-gray-500" />
                <div className="max-w-[150px]">
                  <UsersProfilePic checkedUsers={task.assignedTo || []} />
                </div>
              </div>
              
              {task.attachments?.length > 0 && (
                <div className="flex items-center gap-1 text-gray-600 bg-gray-100/80 px-2 py-1 rounded-full">
                  <ImAttachment className="w-3 h-3" />
                  <span className="text-xs font-medium">{task.attachments.length}</span>
                </div>
              )}
            </div> */}

            {/* Checklist preview */}
            {/* {task.todoChecklist?.length > 0 && (
              <div className="mt-2 p-3 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600">Checklist Progress</span>
                  <span className="text-xs font-bold text-gray-800">
                    {completedTask}/{task.todoChecklist.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {task.todoChecklist.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      {item.completed ? (
                        <BsCheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <BsCircle className="w-3 h-3 text-gray-400" />
                      )}
                      <span className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-700'} truncate`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                  {task.todoChecklist.length > 2 && (
                    <div className="text-xs text-gray-500 pl-5">
                      +{task.todoChecklist.length - 2} more items
                    </div>
                  )}
                </div>
              </div>
            )} */}
          </div>

          {/* Hover overlay */}
          <div className={`
            absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            rounded-2xl
          `}></div>
        </div>
      )}
    </>
  )
}

export default ManageTaskCard