import React from 'react'
import DistributionChart from './DistributionChart'
import PriorityBarChart from './PriorityBarChart'

const GraphSection = ({taskDetail}) => {
  return (
    <div className="w-full h-[400px] gap-4 flex">

            {/* Pie Chart */}
            <div className="w-[50%] bg-white rounded-xl">
              
              <DistributionChart Pending={taskDetail.charts.taskDistribution.Pending} Completed={taskDetail.charts.taskDistribution.Completed} InProgress={taskDetail.charts.taskDistribution.InProgress}/>
              
             
            </div>

            {/* Graph Section */}
            <div className="w-[50%] bg-white rounded-xl">
                <PriorityBarChart Low={taskDetail.charts.taskPriorityLevels.Low} Medium={taskDetail.charts.taskPriorityLevels.Medium} High={taskDetail.charts.taskPriorityLevels.High}/>
            </div>

          </div>
  )
}

export default GraphSection