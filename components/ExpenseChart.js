"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#f97316",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
  "#06b6d4",
  "#64748b",
];

export function CategoryPie({ data }) {
  return (
    <div className="card">
      <h3 className="font-bold text-slate-800 mb-4">Category Breakdown</h3>
      {data.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export function MonthlyBar({ data }) {
  return (
    <div className="card">
      <h3 className="font-bold text-slate-800 mb-4">Monthly Expenses</h3>
      {data.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} name="৳" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}