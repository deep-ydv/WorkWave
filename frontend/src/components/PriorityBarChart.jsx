import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const PriorityBarChart = ({ Low, Medium, High }) => {
  const data = [
    {
      name: 'Low',
      value: Low,
      fill: '#10b981', // green-500
    },
    {
      name: 'Med',
      value: Medium,
      fill: '#f59e0b', // amber-500
    },
    {
      name: 'High',
      value: High,
      fill: '#ef4444', // red-500
    },
  ];

  // Custom legend renderer
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            className="flex items-center space-x-2 text-xs sm:text-sm md:text-base lg:text-lg"
          >
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            ></span>
            {/* <span>{entry.value}</span> */}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full h-[280px] sm:h-[340px] lg:h-[380px] py-8 flex flex-col  border-">
      <ResponsiveContainer width="90%" height="100%" className="border-0 ">
        <BarChart data={data}    barCategoryGap="20%"     margin={{ top: 0, right: 20, left: 0, bottom: 0 }} >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#1c1f22' }} />
          <YAxis tick={{ fontSize: 12, fill: '#1c1f22' }}  orientation="left"    mirror={false}  />
          <Tooltip />
          {/* <Legend content={renderLegend} /> */}
          <Bar dataKey="value" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityBarChart;
