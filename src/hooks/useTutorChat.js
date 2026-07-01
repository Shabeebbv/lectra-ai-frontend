import { useEffect, useState, useCallback } from "react"
import api from "../api/axios"

// Manages one lecture's AI Tutor conversation: loads saved history from
// GET /lectures/:id/tutor-history/, and posts new questions to
// POST /lectures/:id/ask/, appending the saved Q&A pair once it returns.
export function useTutorChat(lectureId) {
  const [messages, setMessages] = useState([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [isAsking, setIsAsking] = useState(false)
  const [error, setError] = useState("")

  const fetchHistory = useCallback(async () => {
    setIsLoadingHistory(true)
    setError("")
    try {
      const response = await api.get(`/lectures/${lectureId}/tutor-history/`)
      setMessages(response.data)
    } catch (err) {
      console.log(err.response?.data)
      setError("Couldn't load this lecture's tutor history.")
    } finally {
      setIsLoadingHistory(false)
    }
  }, [lectureId])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  const askQuestion = async (question) => {
    setError("")
    setIsAsking(true)
    try {
      const response = await api.post(`/lectures/${lectureId}/ask/`, { question })
      setMessages((prev) => [...prev, response.data])
      return true
    } catch (err) {
      console.log(err.response?.data)
      setError(err?.response?.data?.message || "Couldn't get an answer. Try again.")
      return false
    } finally {
      setIsAsking(false)
    }
  }

  return { messages, isLoadingHistory, isAsking, error, askQuestion }
}