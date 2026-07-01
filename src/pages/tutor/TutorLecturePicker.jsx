import { Link } from "react-router-dom"
import { GraduationCap } from "lucide-react"
import Sidebar from "../../components/common/Sidebar"
import TopNavBar from "../../components/common/Topbar"
import EmptyLectures from "../../components/dashboard/EmptyLectures"
import { useLectures } from "../../hooks/useLectures"
import { formatLectureDate } from "../../utils/formatLectureDate"

function TutorLecturePicker() {
  const { lectures, isLoading, error } = useLectures()
  const completedLectures = lectures.filter((l) => l.status === "completed")

  return (
    <div className="bg-[#f9f9ff] text-[#111c2d] min-h-screen">
      <TopNavBar />
      <Sidebar />

      <main className="pt-24 pb-12 px-6 lg:ml-64">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold">AI Tutor</h2>
            <p className="text-[#424754]">Pick a lecture to ask questions about.</p>
          </div>

          {isLoading && (
            <p className="text-sm text-[#424754] py-12 text-center">Loading your lectures...</p>
          )}

          {!isLoading && error && (
            <p className="text-sm text-[#ba1a1a] py-12 text-center">{error}</p>
          )}

          {!isLoading && !error && completedLectures.length === 0 && <EmptyLectures />}

          {!isLoading && !error && completedLectures.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {completedLectures.map((lecture) => (
                <Link
                  key={lecture.id}
                  to={`/tutor/${lecture.id}`}
                  className="bg-white border border-[#e2e8f0] shadow-[0_4px_12px_rgba(30,41,59,0.05)]
                             hover:shadow-[0_8px_24px_rgba(30,41,59,0.08)] hover:-translate-y-0.5
                             transition-all p-5 rounded-2xl flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#e7eeff] flex items-center justify-center">
                    <GraduationCap size={20} className="text-[#0058be]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#111c2d] line-clamp-2">
                    {lecture.title}
                  </h4>
                  <p className="text-sm text-[#424754]">{formatLectureDate(lecture.created_at)}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default TutorLecturePicker