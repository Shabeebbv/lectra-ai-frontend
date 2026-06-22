// Static visual only — bar heights are hardcoded to match the design.
// Wire to real daily-activity data once that endpoint exists.
const PLACEHOLDER_DAYS = [
  { label: "Mon", heightClass: "h-1/2" },
  { label: "Tue", heightClass: "h-4/5" },
  { label: "Wed", heightClass: "h-1/3" },
  { label: "Thu", heightClass: "h-full" },
  { label: "Fri", heightClass: "h-2/3" },
  { label: "Sat", heightClass: "h-1/4" },
  { label: "Sun", heightClass: "h-1/5" },
]

function LearningTimeline() {
  return (
    <div className="bg-white border border-[#e2e8f0] shadow-[0_4px_12px_rgba(30,41,59,0.05)] rounded-2xl p-6 mt-6 h-64">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-[#111c2d]">Learning Timeline</h3>
        <span className="text-sm text-[#424754]">Current Week</span>
      </div>

      <div className="flex items-end justify-between h-32 gap-4 px-2">
        {PLACEHOLDER_DAYS.map((day) => (
          <div key={day.label} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-[#0058be]/20 rounded-full h-24 relative overflow-hidden">
              <div className={`absolute bottom-0 w-full bg-[#0058be] ${day.heightClass}`} />
            </div>
            <span className="text-xs text-[#424754]">{day.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LearningTimeline