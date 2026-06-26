import { useEffect, useState, useCallback, useRef } from "react"
import api from "../api/axios"
import { useLectureSocket } from "../context/LectureSocketContext"

// Fetches one lecture (with transcript + notes) from GET /lectures/:id/.
// When the shared WebSocket reports a new status for *this* lecture id,
// re-fetches the full record — a status change to "completed" means the
// transcript/notes fields are now populated too, and those only come from
// this detail endpoint (the list endpoint doesn't include them).
export function useLectureDetail(lectureId) {
  const [lecture, setLecture] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const { statusUpdates } = useLectureSocket()
  const lastHandledStatus = useRef(null)

  const fetchLecture = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await api.get(`/lectures/${lectureId}/`)
      setLecture(response.data)
    } catch (err) {
      console.log(err.response?.data)
      setError("Couldn't load this lecture.")
    } finally {
      setIsLoading(false)
    }
  }, [lectureId])

  useEffect(() => {
    fetchLecture()
  }, [fetchLecture])

  useEffect(() => {
    const liveStatus = statusUpdates[lectureId]
    if (!liveStatus || liveStatus === lastHandledStatus.current) return

    lastHandledStatus.current = liveStatus
    fetchLecture()
  }, [statusUpdates, lectureId, fetchLecture])

  return { lecture, isLoading, error, refetch: fetchLecture }
}