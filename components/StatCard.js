export default function StatCard({ title, value, icon, color = "indigo" }) {
  const colors = {
    indigo: "from-indigo-500 to-purple-600",
    green: "from-emerald-500 to-green-600",
    orange: "from-orange-500 to-red-500",
    blue: "from-blue-500 to-cyan-500",
  };

  return (
    <div className="card flex items-center gap-4 hover:shadow-md transition">
      <div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white text-2xl shrink-0`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-800 truncate">{value}</p>
      </div>
    </div>
  );
}