import { useState } from "react"
import axios from "axios"
import api from "../api/axios"

// Orchestrates the full lecture upload flow:
//   1. POST /lectures/upload-url/   -> { upload_url, file_url, content_type }
//   2. PUT the raw file to upload_url (direct to S3, tracked for progress)
//   3. POST /lectures/upload/       -> creates the Lecture row, kicks off processing
//
// Returns everything a form needs to drive a progress UI: status, progress %,
// error message, and the upload(...) function to start the flow.
export function useUploadLecture() {
  const [status, setStatus] = useState("idle") // idle | requesting-url | uploading | creating | success | error
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")

  const reset = () => {
    setStatus("idle")
    setProgress(0)
    setError("")
  }

  const upload = async ({ file, title }) => {
    setError("")
    setProgress(0)

    try {
      setStatus("requesting-url")
      const { data: presigned } = await api.post("/lectures/upload-url/", {
        filename: file.name,
      })

      setStatus("uploading")
      await axios.put(presigned.upload_url, file, {
        headers: { "Content-Type": presigned.content_type },
        onUploadProgress: (event) => {
          if (!event.total) return
          setProgress(Math.round((event.loaded / event.total) * 100))
        },
      })

      setStatus("creating")
      const { data: lecture } = await api.post("/lectures/upload/", {
        title,
        video_file: presigned.file_url,
      })

      setStatus("success")
      return lecture
    } catch (err) {
      console.log(err.response?.data || err.message)
      setStatus("error")
      setError(
        err?.response?.data?.message || "Upload failed. Please try again."
      )
      return null
    }
  }

  return { upload, status, progress, error, reset }
}