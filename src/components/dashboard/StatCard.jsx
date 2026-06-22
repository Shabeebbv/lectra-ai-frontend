function StatCard({ icon: Icon, iconBgClass, iconColorClass, label, value }) {
  return (
    <div className="bg-white border border-[#e2e8f0] shadow-[0_4px_12px_rgba(30,41,59,0.05)] hover:shadow-[0_8px_24px_rgba(30,41,59,0.08)] hover:-translate-y-0.5 transition-all p-6 rounded-2xl flex items-center gap-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBgClass}`}>
        <Icon size={22} className={iconColorClass} />
      </div>
      <div>
        <p className="text-xs text-[#424754] uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-semibold text-[#111c2d]">{value}</p>
      </div>
    </div>
  )
}

export default StatCard