/* eslint-disable react/prop-types */

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

const PercentageChart = ({ marks = 75, totalMarks = 100 }) => {
  const remaining = totalMarks - marks;
  const percentage = ((marks / totalMarks) * 100).toFixed(0);

  const data = [
    { name: "Marks", value: marks },
    { name: "Remaining", value: remaining },
  ];

  const COLORS = ["#3b82f6", "#e5e7eb"];

  const renderLabel = () => {
    return (
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-current"
      >
        <tspan className="text-sm font-bold">{percentage}%</tspan>
      </text>
    );
  };
  return (
    <>
      <div className="w-36 h-28">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={45}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
              <Label content={renderLabel} position="center" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default PercentageChart;
