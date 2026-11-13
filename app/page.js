"use client";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import StatCard from "@/components/StatCard";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseCard from "@/components/ExpenseCard";
import { CategoryPie, MonthlyBar } from "@/components/ExpenseChart";

export default function HomePage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get("/api/expenses");
      setExpenses(data.data);
    } catch (err) {
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this expense?")) return;
    try {
      await axios.delete(`/api/expenses/${id}`);
      toast.success("Deleted!");
      fetchExpenses();
    } catch {
      toast.error("Delete failed");
    }
  };

  const stats = useMemo(() => {
    const now = new Date();
    const total = expenses.reduce((s, e) => s + Number(e.amount), 0);

    const thisMonth = expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((s, e) => s + Number(e.amount), 0);

    const today = expenses
      .filter(
        (e) =>
          new Date(e.date).toDateString() === new Date().toDateString()
      )
      .reduce((s, e) => s + Number(e.amount), 0);

    return { total, thisMonth, today, count: expenses.length };
  }, [expenses]);

  const categoryData = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + Number(e.amount);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const monthlyData = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      const d = new Date(e.date);
      const key = `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;
      map[key] = (map[key] || 0) + Number(e.amount);
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .slice(-6);
  }, [expenses]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Dashboard
        </h1>
        <p className="text-slate-500">Track your daily expenses at a glance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Spent" value={`৳${stats.total.toFixed(2)}`} icon="💰" color="indigo" />
        <StatCard title="This Month" value={`৳${stats.thisMonth.toFixed(2)}`} icon="📅" color="green" />
        <StatCard title="Today" value={`৳${stats.today.toFixed(2)}`} icon="🛒" color="orange" />
        <StatCard title="Total Records" value={stats.count} icon="📊" color="blue" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryPie data={categoryData} />
        <MonthlyBar data={monthlyData} />
      </div>

      {/* Form + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ExpenseForm
            onSuccess={() => {
              fetchExpenses();
              setEditing(null);
            }}
            initialData={editing}
            onCancel={() => setEditing(null)}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-800">Recent Expenses</h2>
          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : expenses.length === 0 ? (
            <div className="card text-center text-slate-400 py-12">
              No expenses yet. Add your first one! 🎉
            </div>
          ) : (
            expenses.slice(0, 6).map((e) => (
              <ExpenseCard
                key={e._id}
                expense={e}
                onEdit={setEditing}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}