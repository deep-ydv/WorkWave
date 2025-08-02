import React from 'react'
import DistributionChart from './DistributionChart'
import PriorityBarChart from './PriorityBarChart'

const GraphSection = ({taskDetail}) => {
  return (
    <div className="w-full space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Analytics Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">Task distribution and priority insights</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">Live Data</span>
        </div>
      </div>

      {/* Charts Container */}
      <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Distribution Chart */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Task Distribution</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Status Overview</span>
              </div>
            </div>
            <div className="h-[250px] lg:h-[300px] flex items-center justify-center">
              <DistributionChart 
                Pending={taskDetail?.charts?.taskDistribution?.Pending || 0} 
                Completed={taskDetail?.charts?.taskDistribution?.Completed || 0} 
                InProgress={taskDetail?.charts?.taskDistribution?.InProgress || 0}
              />
            </div>
          </div>
          
          {/* Chart Legend */}
          <div className="px-4 lg:px-6 pb-4 lg:pb-6">
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Chart */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Priority Levels</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Priority Analysis</span>
              </div>
            </div>
            <div className="h-[250px] lg:h-[300px] flex items-center justify-center">
              <PriorityBarChart 
                Low={taskDetail?.charts?.taskPriorityLevels?.Low || 0} 
                Medium={taskDetail?.charts?.taskPriorityLevels?.Medium || 0} 
                High={taskDetail?.charts?.taskPriorityLevels?.High || 0}
              />
            </div>
          </div>
          
          {/* Chart Legend */}
          <div className="px-4 lg:px-6 pb-4 lg:pb-6">
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Low Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">Medium Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">High Priority</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-4">
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-200/20 rounded-xl p-3 lg:p-4">
          <div className="text-xs text-blue-600 font-medium">Total Tasks</div>
          <div className="text-lg lg:text-xl font-bold text-blue-700">
            {(taskDetail?.charts?.taskDistribution?.Pending || 0) + 
             (taskDetail?.charts?.taskDistribution?.InProgress || 0) + 
             (taskDetail?.charts?.taskDistribution?.Completed || 0)}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-200/20 rounded-xl p-3 lg:p-4">
          <div className="text-xs text-green-600 font-medium">Completion Rate</div>
          <div className="text-lg lg:text-xl font-bold text-green-700">
            {taskDetail?.charts?.taskDistribution?.Completed && 
             ((taskDetail.charts.taskDistribution.Pending + taskDetail.charts.taskDistribution.InProgress + taskDetail.charts.taskDistribution.Completed) > 0)
              ? Math.round((taskDetail.charts.taskDistribution.Completed / 
                  (taskDetail.charts.taskDistribution.Pending + taskDetail.charts.taskDistribution.InProgress + taskDetail.charts.taskDistribution.Completed)) * 100)
              : 0}%
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-200/20 rounded-xl p-3 lg:p-4">
          <div className="text-xs text-yellow-600 font-medium">Active Tasks</div>
          <div className="text-lg lg:text-xl font-bold text-yellow-700">
            {(taskDetail?.charts?.taskDistribution?.Pending || 0) + 
             (taskDetail?.charts?.taskDistribution?.InProgress || 0)}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 backdrop-blur-sm border border-purple-200/20 rounded-xl p-3 lg:p-4">
          <div className="text-xs text-purple-600 font-medium">High Priority</div>
          <div className="text-lg lg:text-xl font-bold text-purple-700">
            {taskDetail?.charts?.taskPriorityLevels?.High || 0}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl -z-10"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl -z-10"></div>
    </div>
  )
}

export default GraphSection