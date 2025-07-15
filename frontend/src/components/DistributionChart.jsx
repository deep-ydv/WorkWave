import React from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip,
} from 'recharts';



const DistributionChart = ({Pending,Completed,InProgress}) => {
  const data = [
    { name: 'Pending', value: Pending },
    { name: 'In Progress', value: InProgress },
    { name: 'Completed', value: Completed },
  ];
  
  const COLORS = ['#8b5cf6', '#06b6d4', '#84cc16']; // Tailwind-like colors
  return (
    <div className="flex flex-col items-center py-8  w-full h-full">
      <h2 className="text-xl font-bold mb-4">Task Distribution</h2>
      <PieChart width={450} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={120}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
};

export default DistributionChart;
