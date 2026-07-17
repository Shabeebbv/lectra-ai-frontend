import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TimeSeriesChart({ title, data, color = "#0058be" }) {
  const formatted = data.map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
  }));

  return (
    <div className="bg-white border border-[#c2c6d6] rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-[#111c2d] mb-4">{title}</h2>
      {formatted.length === 0 ? (
        <p className="text-sm text-[#727785] py-12 text-center">No data in this range.</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e9f2" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#727785" }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#727785" }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #c2c6d6", fontSize: 12 }}
            />
            <Line type="monotone" dataKey="count" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}