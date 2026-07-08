import { Clock3 } from "lucide-react"
import { useNavigate } from "react-router-dom"

function TimelineCard({ lecture }) {

  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/timeline/${lecture.id}`)}
      className="bg-white rounded-xl border p-5 shadow-sm cursor-pointer hover:shadow-md transition"
    >

      <div className="flex justify-between items-center mb-4">

        <h3 className="font-semibold text-lg">
          {lecture.title}
        </h3>

        <Clock3 className="w-5 h-5 text-blue-500" />

      </div>

      <p className="text-sm text-gray-500 mb-5">
        View AI generated timeline for this lecture.
      </p>

      <button
        className="text-blue-600 font-medium"
      >
        View Timeline →
      </button>

    </div>
  )
}

export default TimelineCard