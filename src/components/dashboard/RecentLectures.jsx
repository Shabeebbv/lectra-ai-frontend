import { Link } from "react-router-dom"
import LectureCard from "./LectureCard"
import EmptyLectures from "./EmptyLectures"

const RECENT_COUNT = 3

function RecentLectures({ lectures, isLoading, error }) {
  const recentLectures = lectures.slice(0, RECENT_COUNT)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-[#111c2d]">Recent Lectures</h3>
        <Link to="/lectures" className="text-sm text-[#0058be] hover:underline">
          View All
        </Link>
      </div>

      {isLoading && (
        <p className="text-sm text-[#424754] py-6 text-center">Loading your lectures...</p>
      )}

      {!isLoading && error && (
        <p className="text-sm text-[#ba1a1a] py-6 text-center">{error}</p>
      )}

      {!isLoading && !error && recentLectures.length === 0 && <EmptyLectures />}

      {!isLoading && !error && recentLectures.length > 0 && (
        <div className="flex flex-col gap-4">
          {recentLectures.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
        </div>
      )}
    </section>
  )
}

export default RecentLectures