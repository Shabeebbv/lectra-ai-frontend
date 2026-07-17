function StatCard({ label, value, icon: Icon, accent = "#0058be", loading }) {
  return (
    <div className="bg-white border border-[#c2c6d6] rounded-2xl p-5 flex items-center gap-4">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accent}1a` }}
      >
        <Icon size={20} style={{ color: accent }} />
      </div>
      <div>
        <p className="text-xs font-medium text-[#727785] uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-semibold text-[#111c2d] mt-0.5">
          {loading ? "—" : value ?? 0}
        </p>
      </div>
    </div>
  )
}

export default StatCard