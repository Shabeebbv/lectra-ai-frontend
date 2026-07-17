import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PALETTE = ["#0058be", "#7c3aed", "#0891b2", "#d97706", "#16a34a", "#dc2626"];

export default function BreakdownDonut({ title, data, labelKey }) {
  const formatted = data.map((d) => ({
    name: d[labelKey],
    value: d.count,
  }));

  const total = formatted.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white border border-[#c2c6d6] rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-[#111c2d] mb-4">{title}</h2>
      {total === 0 ? (
        <p className="text-sm text-[#727785] py-12 text-center">No data yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={formatted}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
            >
              {formatted.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #c2c6d6", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}