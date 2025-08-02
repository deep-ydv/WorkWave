import React, { useState } from 'react'
import { FaArrowRight, FaCalendarAlt, FaTasks, FaFilter } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import DateFixing from './DateFixing';

const RecentTasks = ({recentTasks}) => {
  const [showAll, setShowAll] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Filter tasks based on status
  const filteredTasks = filterStatus === 'All' 
    ? recentTasks 
    : recentTasks.filter(task => task.status === filterStatus);
  
  // Show limited tasks or all based on showAll state
  const displayTasks = showAll ? filteredTasks : filteredTasks.slice(0, 5);
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'text-purple-700 bg-purple-100 border-purple-200';
      case 'In Progress': return 'text-cyan-700 bg-cyan-100 border-cyan-200';
      case 'Completed': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-700 bg-red-100 border-red-200';
      case 'Medium': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'Low': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
      
      <div className='relative z-10 flex flex-col p-4 lg:p-6'>
        {/* Header Section */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <FaTasks className="text-white text-lg" />
            </div>
            <div>
              <h2 className='font-bold text-xl lg:text-2xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                Recent Tasks
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Updates • {recentTasks?.length || 0} tasks</span>
              </div>
            </div>
          </div>
          
          {/* Filter and Actions */}
          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <div className="relative">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <MdKeyboardArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            
            {/* See All Button */}
            <button 
              onClick={() => setShowAll(!showAll)}
              className='px-4 py-2 font-semibold flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg gap-2 text-sm transition-all duration-300 transform hover:scale-105 shadow-lg'
            >
              {showAll ? 'Show Less' : 'See All'} 
              <FaArrowRight className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className='hidden lg:block'>
          <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4'>
            <div className='flex justify-between font-bold text-gray-700'>
              <p className='w-[35%]'>Task Name</p>
              <p className='w-[20%] text-center'>Status</p>
              <p className='w-[20%] text-center'>Priority</p>
              <p className='w-[25%] text-center'>Created On</p>
            </div>
          </div>
          
          <div className='space-y-3'>
            {displayTasks?.length > 0 ? displayTasks.map((task, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className='w-[35%]'>
                  <p className='font-semibold text-gray-800 truncate'>{task.title}</p>
                </div>
                <div className='w-[20%] flex justify-center'>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(task.status)} transition-all duration-300 hover:scale-105`}>
                    {task.status}
                  </span>
                </div>
                <div className='w-[20%] flex justify-center'>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(task.priority)} transition-all duration-300 hover:scale-105`}>
                    {task.priority}
                  </span>
                </div>
                <div className='w-[25%] flex justify-center items-center gap-2 text-gray-600'>
                  <FaCalendarAlt className="text-xs" />
                  <DateFixing date={task.createdAt?.slice(0,10)} />
                </div>
              </div>
            )) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTasks className="text-gray-400 text-xl" />
                </div>
                <p className="text-gray-500 font-medium">No tasks found</p>
                <p className="text-gray-400 text-sm">Tasks will appear here once created</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className='lg:hidden space-y-4'>
          {displayTasks?.length > 0 ? displayTasks.map((task, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-between items-start mb-3">
                <h3 className='font-semibold text-gray-800 flex-1 mr-2'>{task.title}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(task.status)} whitespace-nowrap`}>
                  {task.status}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Priority:</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendarAlt className="text-xs" />
                  <DateFixing date={task.createdAt?.slice(0,10)} />
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTasks className="text-gray-400 text-xl" />
              </div>
              <p className="text-gray-500 font-medium">No tasks found</p>
              <p className="text-gray-400 text-sm">Tasks will appear here once created</p>
            </div>
          )}
        </div>

        {/* Bottom Stats */}
        {filteredTasks?.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200/50">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Showing {displayTasks.length} of {filteredTasks.length} tasks</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Pending: {recentTasks?.filter(t => t.status === 'Pending').length || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>In Progress: {recentTasks?.filter(t => t.status === 'In Progress').length || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Completed: {recentTasks?.filter(t => t.status === 'Completed').length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentTasks