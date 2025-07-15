import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';



const PriorityBarChart = ({Low,Medium,High}) => {
  const data = [
    {
      name: 'Low',
      value: Low,
      fill: '#10b981', // green-500
    },
    {
      name: 'Medium',
      value: Medium,
      fill: '#f59e0b', // amber-500
    },
    {
      name: 'High',
      value: High,
      fill: '#ef4444', // red-500
    },
  ];
  return (
    <div className="w-full h-full py-8 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Task Priority Levels</h2>
      <ResponsiveContainer width="90%" height="90%">
        <BarChart data={data} barSize={60}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="value" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityBarChart;
