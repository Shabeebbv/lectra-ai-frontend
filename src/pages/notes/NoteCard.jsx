import { Link } from "react-router-dom"
import { FileText } from "lucide-react"
import { formatLectureDate } from "../../utils/formatLectureDate"

function NoteCard({ lecture }) {
  return (
    <Link
      to={`/notes/${lecture.id}`}
      className="bg-white border border-[#e2e8f0] shadow-[0_4px_12px_rgba(30,41,59,0.05)]
                 hover:shadow-[0_8px_24px_rgba(30,41,59,0.08)] hover:-translate-y-0.5
                 transition-all p-5 rounded-2xl flex flex-col gap-3"
    >
      <div className="w-10 h-10 rounded-xl bg-[#e7eeff] flex items-center justify-center">
        <FileText size={20} className="text-[#0058be]" />
      </div>

      <h4 className="text-lg font-semibold text-[#111c2d] line-clamp-2">{lecture.title}</h4>

      <p className="text-sm text-[#424754]">{formatLectureDate(lecture.created_at)}</p>
    </Link>
  )
}

export default NoteCard