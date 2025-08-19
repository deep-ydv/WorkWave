import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const DistributionChart = ({ Pending, Completed, InProgress }) => {
  const data = [
    { name: 'Pending', value: Pending },
    { name: 'In Progress', value: InProgress },
    { name: 'Completed', value: Completed },
  ];

  const COLORS = ['#8b5cf6', '#06b6d4', '#84cc16']; // Tailwind-like colors

  // Custom legend renderer (to control font size responsively)
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
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col items-center py-8 w-full h-[320px] sm:h-[340px] lg:h-[450px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="70%" // increased outer radius
            paddingAngle={2.5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          {/* <Legend content={renderLegend} /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistributionChart;
