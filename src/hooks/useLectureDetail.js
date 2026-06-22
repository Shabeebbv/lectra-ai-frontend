import { useEffect, useState, useCallback } from "react"
import api from "../api/axios"

// Fetches one lecture (with transcript + notes) from GET /lectures/:id/.
export function useLectureDetail(lectureId) {
  const [lecture, setLecture] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

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

  return { lecture, isLoading, error, refetch: fetchLecture }
}