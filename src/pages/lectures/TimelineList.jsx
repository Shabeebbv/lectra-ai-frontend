import { useMemo, useState } from "react"

import TopNavBar from "../../components/common/Topbar"
import Sidebar from "../../components/common/Sidebar"
import SearchInput from "./SearchInput"

import { useLectures } from "../../hooks/useLectures"
import TimelineCard from "./TimelineCard"
import EmptyTimeline from "./EmptyTimeline"

function TimelineList() {
  const { lectures, isLoading, error } = useLectures()

  const [query, setQuery] = useState("")

  const filteredLectures = useMemo(() => {
    const search = query.trim().toLowerCase()

    if (!search) return lectures

    return lectures.filter((lecture) =>
      lecture.title.toLowerCase().includes(search)
    )
  }, [lectures, query])

  return (
    <div className="bg-[#f9f9ff] text-[#111c2d] min-h-screen">
      <TopNavBar />
      <Sidebar />

      <main className="pt-24 pb-12 px-6 lg:ml-64">
        <div className="max-w-screen-xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">

            <div>
              <h2 className="text-3xl font-semibold">
                Lecture Timeline
              </h2>

              <p className="text-[#424754]">
                View AI generated timeline for your lectures.
              </p>
            </div>

            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search lectures..."
            />

          </div>

          {isLoading && (
            <p className="text-center py-12">
              Loading timelines...
            </p>
          )}

          {!isLoading && error && (
            <p className="text-center py-12 text-red-500">
              {error}
            </p>
          )}

          {!isLoading && !error && filteredLectures.length === 0 && (
            <EmptyTimeline />
          )}

          {!isLoading && !error && filteredLectures.length > 0 && (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {filteredLectures.map((lecture) => (
                <TimelineCard
                  key={lecture.id}
                  lecture={lecture}
                />
              ))}

            </div>

          )}

        </div>
      </main>
    </div>
  )
}

export default TimelineList
