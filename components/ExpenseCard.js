"use client";

const categoryColors = {
  Bazar: "bg-emerald-100 text-emerald-700",
  Transport: "bg-blue-100 text-blue-700",
  Food: "bg-orange-100 text-orange-700",
  Bills: "bg-red-100 text-red-700",
  Shopping: "bg-pink-100 text-pink-700",
  Health: "bg-purple-100 text-purple-700",
  Education: "bg-cyan-100 text-cyan-700",
  Other: "bg-slate-100 text-slate-700",
};

export default function ExpenseCard({ expense, onEdit, onDelete }) {
  return (
    <div className="card flex items-center gap-3 hover:shadow-md transition">
      <div
        className={`shrink-0 px-3 py-1 rounded-lg text-xs font-semibold ${
          categoryColors[expense.category] || categoryColors.Other
        }`}
      >
        {expense.category}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 truncate">{expense.title}</p>
        <p className="text-xs text-slate-500">
          {new Date(expense.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
          {expense.note && ` • ${expense.note}`}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="font-bold text-slate-800">৳{expense.amount}</p>
        <div className="flex gap-1 mt-1">
          <button
            onClick={() => onEdit(expense)}
            className="text-xs text-indigo-600 hover:underline"
          >
            Edit
          </button>
          <span className="text-xs text-slate-300">|</span>
          <button
            onClick={() => onDelete(expense._id)}
            className="text-xs text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}