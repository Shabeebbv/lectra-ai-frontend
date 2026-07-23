import { useMemo, useState } from "react"
import TopNavBar from "../../components/common/Topbar"
import Sidebar from "../../components/common/Sidebar"
import NoteCard from "./NoteCard"
import EmptyNotes from "./EmptyNotes"
import SearchInput from "../lectures/SearchInput"
import { useNotes } from "../../hooks/useNotes"

function NotesList() {
  const { notedLectures, isLoading, error } = useNotes()
  const [query, setQuery] = useState("")

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return notedLectures
    return notedLectures.filter((lecture) =>
      lecture.title.toLowerCase().includes(normalizedQuery)
    )
  }, [notedLectures, query])

  return (
    <div className="bg-[#f9f9ff] text-[#111c2d] min-h-screen">
      <TopNavBar />
      <Sidebar />

      <main className="pt-24 pb-12 px-6 lg:ml-64">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-semibold">My Notes</h2>
              <p className="text-[#424754]">
                AI-generated notes from your completed lectures.
              </p>
            </div>

            <SearchInput value={query} onChange={setQuery} placeholder="Search notes..." />
          </div>

          {isLoading && (
            <p className="text-sm text-[#424754] py-12 text-center">Loading your notes...</p>
          )}

          {!isLoading && error && (
            <p className="text-sm text-[#ba1a1a] py-12 text-center">{error}</p>
          )}

          {!isLoading && !error && filteredNotes.length === 0 && <EmptyNotes />}

          {!isLoading && !error && filteredNotes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredNotes.map((lecture) => (
                <NoteCard key={lecture.id} lecture={lecture} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default NotesList
