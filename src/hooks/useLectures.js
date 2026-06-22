import { useEffect, useState, useCallback } from "react"
import api from "../api/axios"

// Fetches the authenticated user's lectures from GET /lectures/list/.
// Returns { lectures, isLoading, error, refetch } so any page can reuse it.
export function useLectures() {
  const [lectures, setLectures] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

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

  return { lectures, isLoading, error, refetch: fetchLectures }
}