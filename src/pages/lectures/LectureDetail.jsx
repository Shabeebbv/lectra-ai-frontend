import { useParams } from "react-router-dom"
import Sidebar from "../../components/common/sidebar"
import LectureDetailTopBar from "./LectureDetailTopBar"
import LecturePlayer from "./LecturePlayer"
import SummaryCard from "./SummaryCard"
import TranscriptPanel from "./TranscriptPanel"
import { useLectureDetail } from "../../hooks/useLectureDetail"

function LectureDetail() {
  const { id } = useParams()
  const { lecture, isLoading, error } = useLectureDetail(id)

  if (isLoading) {
    return (
      <PageShell>
        <p className="text-[#424754] text-center mt-20">Loading lecture...</p>
      </PageShell>
    )
  }

  if (error || !lecture) {
    return (
      <PageShell>
        <p className="text-[#ba1a1a] text-center mt-20">
          {error || "Lecture not found."}
        </p>
      </PageShell>
    )
  }

  return (
    <div className="bg-[#f9f9ff] text-[#111c2d] h-screen overflow-hidden">
      <Sidebar />

      <main className="lg:ml-64 h-screen flex flex-col">
        <LectureDetailTopBar title={lecture.title} status={lecture.status} />

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 lg:p-6 gap-6">
          {/* Left: video + summary */}
          <div className="flex-1 flex flex-col gap-6 min-w-0 overflow-y-auto">
            <LecturePlayer videoUrl={lecture.video_file} />
            <SummaryCard notes={lecture.notes} status={lecture.status} />
          </div>

          {/* Right: transcript */}
          <TranscriptPanel transcript={lecture.transcript} status={lecture.status} />
        </div>
      </main>
    </div>
  )
}

// Shared shell for loading/error states so Sidebar stays visible.
function PageShell({ children }) {
  return (
    <div className="bg-[#f9f9ff] text-[#111c2d] h-screen overflow-hidden">
      <Sidebar />
      <main className="lg:ml-64 h-screen flex flex-col">{children}</main>
    </div>
  )
}

export default LectureDetail