import React from 'react'
import TaskCount from './TaskCount'

const Greet = ({profileData,taskDetail}) => {

  const getGreeting=()=> {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) return "Good Morning ☀️";
    if (hour >= 12 && hour < 17) return "Good Afternoon 🌤️";
    if (hour >= 17 && hour < 22) return "Good Evening 🌇";
    return "Good Night 🌙";
  }

  return (
    <div className="bg-white w-full h-[200px] p-6 flex flex-col gap-2 rounded-2xl">
    <p className="text-3xl font-semibold">{getGreeting()} {profileData.name}</p>
    <p className="text-gray-800">Tuesday 25 Mar 2025</p>
    <div className="py-4 flex justify-between w-[80%]">
      <TaskCount clr="blue" number={taskDetail.charts.taskDistribution.All} text="Total Tasks"/>
      <TaskCount clr="purple" number={taskDetail.charts.taskDistribution.Pending} text="Pending Tasks"/>
      <TaskCount clr="cyan" number={taskDetail.charts.taskDistribution.InProgress} text="In Progress"/>
      <TaskCount clr="green" number={taskDetail.charts.taskDistribution.Completed} text="Completed Tasks"/>

    </div>
</div>
  )
}

export default Greet