import { useEffect, useState, useCallback, useMemo } from "react"
import api from "../api/axios"
import { useLectureSocket } from "../context/LectureSocketContext"

// Fetches the authenticated user's lectures from GET /lectures/list/, then
// keeps their status fresh via the shared WebSocket connection (see
// LectureSocketContext) instead of polling the REST endpoint repeatedly.
export function useLectures() {
  const [lectures, setLectures] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const { statusUpdates } = useLectureSocket()

  const fetchLectures = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await api.get("/lectures/list/")
      setLectures(response.data)
    } catch (err) {
      console.log(err.response?.data)
      setError("Couldn't load your lectures. Try refreshing.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLectures()
  }, [fetchLectures])

  // Overlay any live status updates onto the fetched list. statusUpdates
  // persists for the whole session, so a lecture finishing while the user
  // is on a different page still shows correctly once they navigate back.
  const lecturesWithLiveStatus = useMemo(() => {
    return lectures.map((lecture) =>
      statusUpdates[lecture.id]
        ? { ...lecture, status: statusUpdates[lecture.id] }
        : lecture
    )
  }, [lectures, statusUpdates])

  return {
    lectures: lecturesWithLiveStatus,
    isLoading,
    error,
    refetch: fetchLectures,
  }
}