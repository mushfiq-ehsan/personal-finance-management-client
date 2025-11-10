import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { FaCalendarAlt } from "react-icons/fa";

const pieData = [
  { name: "Freelance", value: 45, color: "#ef4444" },
  { name: "Investment", value: 25, color: "#10b981" },
  { name: "Gift", value: 10, color: "#3b82f6" },
  { name: "Education", value: 8, color: "#ec4899" },
  { name: "Shopping", value: 7, color: "#8b5cf6" },
  { name: "Healthcare", value: 5, color: "#f59e0b" },
];

const barData = [
  { name: "Nov 2025", income: 17000, expenses: 4000 },
  { name: "Oct 2025", income: 13000, expenses: 8000 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Reports = () => {
  return (
    <div className="bg-base-100 p-15">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Financial Reports</h1>
        <button className="btn btn-outline flex items-center gap-2">
          <FaCalendarAlt />
          November 2025
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card bg-base-200 p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card bg-base-200 p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Income vs Expenses
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#10b981" />
                <Bar dataKey="expenses" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

