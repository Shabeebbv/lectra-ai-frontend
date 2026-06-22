import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { getStatusMeta } from "../../config/lectureStatus"

function LectureDetailTopBar({ title, status }) {
  const { label, badgeClass } = getStatusMeta(status)

  return (
    <header className="h-16 px-6 flex items-center justify-between bg-[#f9f9ff]/80 backdrop-blur-md sticky top-0 z-40 border-b border-[#c2c6d6]">
      <div className="flex items-center gap-2 min-w-0">
        {/* No /lectures list page yet — replace with a real Link once it exists */}
        <span className="text-sm text-[#424754]">Lectures</span>
        <ChevronRight size={16} className="text-[#727785]" />
        <h2 className="text-lg font-bold text-[#0058be] truncate">{title}</h2>
      </div>

      <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-semibold ${badgeClass}`}>
        {label}
      </span>
    </header>
  )
}

export default LectureDetailTopBar