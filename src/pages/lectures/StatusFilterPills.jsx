import { STATUS_FILTER_OPTIONS } from "../../config/lectureStatus"

function StatusFilterPills({ activeStatus, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_FILTER_OPTIONS.map((option) => {
        const isActive = option.value === activeStatus
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#0058be] text-white"
                : "bg-[#f0f3ff] text-[#424754] hover:bg-[#dee8ff]"
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default StatusFilterPills