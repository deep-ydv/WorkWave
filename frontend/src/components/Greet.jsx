import React from 'react'
import TaskCount from './TaskCount'

const Greet = ({profileData, taskDetail}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) return "Good Morning ☀️";
    if (hour >= 12 && hour < 17) return "Good Afternoon 🌤️";
    if (hour >= 17 && hour < 22) return "Good Evening 🌇";
    return "Good Night 🌙";
  }

  const getCurrentDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
        {/* Greeting Section */}
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            {getGreeting()} {profileData?.name || 'User'}
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              {getCurrentDate()}
            </p>
          </div>
        </div>

        {/* Task Statistics */}
        <div className="mt-4 sm:mt-6">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Task Overview
            </h3>
          </div>
          
          {/* Desktop/Tablet Layout */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <TaskCount 
              clr="blue" 
              number={taskDetail?.charts?.taskDistribution?.All || 0} 
              text="Total Tasks"
            />
            <TaskCount 
              clr="purple" 
              number={taskDetail?.charts?.taskDistribution?.Pending || 0} 
              text="Pending Tasks"
            />
            <TaskCount 
              clr="cyan" 
              number={taskDetail?.charts?.taskDistribution?.InProgress || 0} 
              text="In Progress"
            />
            <TaskCount 
              clr="green" 
              number={taskDetail?.charts?.taskDistribution?.Completed || 0} 
              text="Completed Tasks"
            />
          </div>

          {/* Mobile Layout */}
          <div className="sm:hidden space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <TaskCount 
                clr="blue" 
                number={taskDetail?.charts?.taskDistribution?.All || 0} 
                text="Total Tasks"
              />
              <TaskCount 
                clr="purple" 
                number={taskDetail?.charts?.taskDistribution?.Pending || 0} 
                text="Pending"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <TaskCount 
                clr="cyan" 
                number={taskDetail?.charts?.taskDistribution?.InProgress || 0} 
                text="In Progress"
              />
              <TaskCount 
                clr="green" 
                number={taskDetail?.charts?.taskDistribution?.Completed || 0} 
                text="Completed"
              />
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live Updates</span>
            </div>
            <div className="text-xs text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Greet