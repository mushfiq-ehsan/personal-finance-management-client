import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#ef4444",
  "#10b981",
  "#3b82f6",
  "#ec4899",
  "#8b5cf6",
  "#f59e0b",
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
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredData, setFilteredData] = useState([]);


  

  useEffect(() => {
    fetch("http://localhost:3000/transaction")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  }, []);



  useEffect(() => {
    if (!selectedMonth) {
      setFilteredData(transactions);
      return;
    }

    const month = new Date(selectedMonth).getMonth();
    const year = new Date(selectedMonth).getFullYear();

    const filtered = transactions.filter((item) => {
      const d = new Date(item.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });

    setFilteredData(filtered);
  }, [selectedMonth, transactions]);

  const categorySummary = filteredData.reduce((acc, curr) => {
    if (curr.type === "Expense") {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    }
    return acc;
  }, {});

  const pieData = Object.keys(categorySummary).map((key) => ({
    name: key,
    value: categorySummary[key],
  }));



  
  const monthSummary = filteredData.reduce(
    (acc, curr) => {
      if (curr.type === "Income") acc.income += curr.amount;
      if (curr.type === "Expense") acc.expenses += curr.amount;
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const barData = [
    {
      name: selectedMonth
        ? new Date(selectedMonth).toLocaleString("default", {
            month: "short",
            year: "numeric",
          })
        : "Selected Month",
      income: monthSummary.income,
      expenses: monthSummary.expenses,
    },
  ];

  return (
    <div className="bg-base-100 p-5">
      <div className="md:flex justify-between items-center pt-10 pb-20">
        <h1 className="text-2xl font-bold">Financial Reports</h1>
        <input
          type="month"
          className="btn"
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-60">
        {/* pie chart */}
        <div className="card bg-base-200 p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">
            Expenses by Category
          </h2>
          <div className="w-full h-64">
            {pieData.length > 0 ? (
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
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 mt-20">
                No expense data for this month.
              </p>
            )}
          </div>
        </div>

        {/* bar chart */}
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
