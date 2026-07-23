import { useParams, Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { ChevronLeft, PlayCircle } from "lucide-react"
import TopNavBar from "../../components/common/Topbar"
import Sidebar from "../../components/common/Sidebar"
import { useLectureDetail } from "../../hooks/useLectureDetail"
import { formatLectureDate } from "../../utils/formatLectureDate"

function NoteDetail() {
  const { id } = useParams()
  const { lecture, isLoading, error } = useLectureDetail(id)

  return (
    <div className="bg-[#f9f9ff] text-[#111c2d] min-h-screen">
      <TopNavBar />
      <Sidebar />

      <main className="pt-24 pb-16 px-6 lg:ml-64">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/notes"
            className="inline-flex items-center gap-1 text-sm text-[#0058be] hover:underline mb-6"
          >
            <ChevronLeft size={16} />
            Back to My Notes
          </Link>

          {isLoading && <p className="text-sm text-[#424754] py-12 text-center">Loading note...</p>}

          {!isLoading && (error || !lecture) && (
            <p className="text-sm text-[#ba1a1a] py-12 text-center">
              {error || "Note not found."}
            </p>
          )}

          {!isLoading && lecture && (
            <article className="bg-white border border-[#e2e8f0] rounded-2xl p-8 shadow-sm">
              <header className="mb-6 pb-6 border-b border-[#e2e8f0]">
                <h1 className="text-2xl font-semibold text-[#111c2d] mb-2">{lecture.title}</h1>
                <div className="flex items-center gap-4 text-sm text-[#424754]">
                  <span>{formatLectureDate(lecture.created_at)}</span>
                  <Link
                    to={`/lectures/${lecture.id}`}
                    className="inline-flex items-center gap-1 text-[#0058be] hover:underline"
                  >
                    <PlayCircle size={15} />
                    View lecture
                  </Link>
                </div>
              </header>

              {lecture.notes ? (
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h2 className="text-lg font-semibold text-[#0058be] mt-6 mb-2">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base font-semibold text-[#111c2d] mt-4 mb-2">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-[#424754] leading-relaxed mb-3">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-5 space-y-1 text-[#424754] mb-3">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                    strong: ({ children }) => (
                      <strong className="font-semibold text-[#111c2d]">{children}</strong>
                    ),
                  }}
                >
                  {lecture.notes}
                </ReactMarkdown>
              ) : (
                <p className="text-sm text-[#424754]">
                  Notes aren't available for this lecture yet.
                </p>
              )}
            </article>
          )}
        </div>
      </main>
    </div>
  )
}

export default NoteDetail
