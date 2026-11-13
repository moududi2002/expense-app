"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const categories = [
  "Bazar",
  "Transport",
  "Food",
  "Bills",
  "Shopping",
  "Health",
  "Education",
  "Other",
];

export default function ExpenseForm({ onSuccess, initialData = null, onCancel }) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      amount: "",
      category: "Bazar",
      date: new Date().toISOString().split("T")[0],
      note: "",
    }
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        await axios.put(`/api/expenses/${initialData._id}`, form);
        toast.success("Expense updated!");
      } else {
        await axios.post("/api/expenses", form);
        toast.success("Expense added!");
      }
      onSuccess?.();
      if (!initialData) {
        setForm({
          title: "",
          amount: "",
          category: "Bazar",
          date: new Date().toISOString().split("T")[0],
          note: "",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h2 className="text-lg font-bold text-slate-800">
        {initialData ? "Edit Expense" : "Add New Expense"}
      </h2>

      <div>
        <label className="label">Title</label>
        <input
          name="title"
          className="input"
          placeholder="e.g., Bazar khoroch"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Amount (৳)</label>
          <input
            name="amount"
            type="number"
            min="0"
            step="0.01"
            className="input"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Category</label>
          <select
            name="category"
            className="input"
            value={form.category}
            onChange={handleChange}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label">Date</label>
        <input
          name="date"
          type="date"
          className="input"
          value={form.date?.split("T")[0]}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="label">Note (optional)</label>
        <textarea
          name="note"
          className="input resize-none"
          rows={2}
          placeholder="Extra notes..."
          value={form.note}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary flex-1 disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update" : "Add Expense"}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}