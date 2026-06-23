import { useMemo, useState } from "react"
import { Upload } from "lucide-react"
import Sidebar from "../../components/common/Sidebar"
import TopNavBar from "../../components/common/Topbar"
import LectureCard from "../../components/dashboard/LectureCard"
import EmptyLectures from "../../components/dashboard/EmptyLectures"
import UploadModal from "../../components/dashboard/UploadModal"
import ConfirmDeleteDialog from "./ConfirmDeleteDialog"
import StatusFilterPills from "./StatusFilterPills"
import SearchInput from "./SearchInput"
import { useLectures } from "../../hooks/useLectures"
import { useDeleteLecture } from "../../hooks/useDeleteLecture"

function LecturesList() {
  const { lectures, isLoading, error, refetch } = useLectures()
  const { deleteLecture, deletingId } = useDeleteLecture()

  const [statusFilter, setStatusFilter] = useState("all")
  const [query, setQuery] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [pendingDelete, setPendingDelete] = useState(null) // lecture object awaiting confirmation

  const filteredLectures = useMemo(() => {
    return lectures.filter((lecture) => {
      const matchesStatus = statusFilter === "all" || lecture.status === statusFilter
      const matchesQuery = lecture.title.toLowerCase().includes(query.trim().toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [lectures, statusFilter, query])

  const handleConfirmDelete = async () => {
    const success = await deleteLecture(pendingDelete.id)
    if (success) {
      setPendingDelete(null)
      refetch()
    }
  }

  return (
    <div className="bg-[#f9f9ff] text-[#111c2d] min-h-screen">
      <TopNavBar />
      <Sidebar />

      <main className="pt-24 pb-12 px-6 lg:ml-64">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-semibold">Lectures</h2>
              <p className="text-[#424754]">All of your uploaded lectures in one place.</p>
            </div>

            <button
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 bg-[#0058be] text-white px-6 py-3 rounded-xl font-bold
                         shadow-lg shadow-[#0058be]/20 hover:opacity-90 active:scale-95 transition-all"
            >
              <Upload size={18} />
              Upload Lecture
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <StatusFilterPills activeStatus={statusFilter} onChange={setStatusFilter} />
            <SearchInput value={query} onChange={setQuery} placeholder="Search lectures..." />
          </div>

          {/* List */}
          {isLoading && (
            <p className="text-sm text-[#424754] py-12 text-center">Loading your lectures...</p>
          )}

          {!isLoading && error && (
            <p className="text-sm text-[#ba1a1a] py-12 text-center">{error}</p>
          )}

          {!isLoading && !error && filteredLectures.length === 0 && (
            <EmptyLectures />
          )}

          {!isLoading && !error && filteredLectures.length > 0 && (
            <div className="flex flex-col gap-4">
              {filteredLectures.map((lecture) => (
                <LectureCard
                  key={lecture.id}
                  lecture={lecture}
                  onDelete={setPendingDelete}
                  isDeleting={deletingId === lecture.id}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUploaded={refetch}
        />
      )}

      {pendingDelete && (
        <ConfirmDeleteDialog
          lectureTitle={pendingDelete.title}
          isDeleting={deletingId === pendingDelete.id}
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}

export default LecturesList