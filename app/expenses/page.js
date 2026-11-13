"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ExpenseCard from "@/components/ExpenseCard";
import ExpenseForm from "@/components/ExpenseForm";

const categories = [
  "All",
  "Bazar",
  "Transport",
  "Food",
  "Bills",
  "Shopping",
  "Health",
  "Education",
  "Other",
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get("/api/expenses");
      setExpenses(data.data);
    } catch {
      toast.error("Failed to load");
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

  const filtered = expenses
    .filter((e) => filter === "All" || e.category === filter)
    .filter(
      (e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.note?.toLowerCase().includes(search.toLowerCase())
    );

  const total = filtered.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          All Expenses
        </h1>
        <p className="text-slate-500">
          {filtered.length} record(s) • Total: <b>৳{total.toFixed(2)}</b>
        </p>
      </div>

      {/* Filters */}
      <div className="card flex flex-col md:flex-row gap-3">
        <input
          className="input md:max-w-xs"
          placeholder="🔍 Search by title or note..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === c
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Edit form */}
      {editing && (
        <ExpenseForm
          initialData={editing}
          onSuccess={() => {
            fetchExpenses();
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card text-center text-slate-400 py-12">
            No expenses found 😕
          </div>
        ) : (
          filtered.map((e) => (
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
  );
}