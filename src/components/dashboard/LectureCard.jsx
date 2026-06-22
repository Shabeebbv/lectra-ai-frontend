import { Play, FileVideo } from "lucide-react"
import { getStatusMeta } from "../../config/lectureStatus"
import { formatLectureDate } from "../../utils/formatLectureDate"

function LectureCard({ lecture, onPlay }) {
  const { label, badgeClass, canPlay } = getStatusMeta(lecture.status)

  return (
    <div className="bg-white border border-[#e2e8f0] shadow-[0_4px_12px_rgba(30,41,59,0.05)] hover:shadow-[0_8px_24px_rgba(30,41,59,0.08)] hover:-translate-y-0.5 transition-all p-3 rounded-2xl flex flex-col sm:flex-row gap-6 items-center group">
      {/* No thumbnail field on the Lecture model yet — placeholder block instead of a fake image */}
      <div className="w-full sm:w-40 h-24 rounded-xl bg-[#e7eeff] flex items-center justify-center shrink-0">
        <FileVideo size={28} className="text-[#0058be]/50" />
      </div>

      <div className="flex-1 min-w-0">
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${badgeClass}`}>
          {label}
        </span>
        <h4 className="text-lg font-semibold mt-1 text-[#111c2d] truncate">
          {lecture.title}
        </h4>
        <div className="flex items-center gap-4 mt-2 text-[#424754] text-sm">
          <span>{formatLectureDate(lecture.created_at)}</span>
        </div>
      </div>

      <div className="pr-2 shrink-0">
        <button
          type="button"
          onClick={() => canPlay && onPlay?.(lecture)}
          disabled={!canPlay}
          title={canPlay ? "Play" : `Lecture is ${label.toLowerCase()}`}
          className="w-10 h-10 rounded-full bg-[#f0f3ff] text-[#0058be] flex items-center justify-center
                     hover:bg-[#0058be] hover:text-white transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#f0f3ff] disabled:hover:text-[#0058be]"
        >
          <Play size={18} fill="currentColor" />
        </button>
      </div>
    </div>
  )
}

export default LectureCard