import { useState } from "react"
import api from "../api/axios"

// Wraps DELETE /lectures/:id/delete/. Returns a deleteLecture(id) function
// plus per-request status so the UI can show a spinner/error on the right card.
export function useDeleteLecture() {
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState("")

  const deleteLecture = async (lectureId) => {
    setDeletingId(lectureId)
    setError("")
    try {
      await api.delete(`/lectures/${lectureId}/delete/`)
      return true
    } catch (err) {
      console.log(err.response?.data)
      setError("Couldn't delete this lecture. Try again.")
      return false
    } finally {
      setDeletingId(null)
    }
  }

  return { deleteLecture, deletingId, error }
}