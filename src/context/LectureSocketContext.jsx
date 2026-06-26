import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react"

const LectureSocketContext = createContext(null)

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL
const RECONNECT_DELAY_MS = 3000
const AUTH_FAILED_CLOSE_CODE = 4401

export function LectureSocketProvider({ children }) {
  const [statusUpdates, setStatusUpdates] = useState({})
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef(null)
  const reconnectTimeoutRef = useRef(null)

  const connect = useCallback(() => {
    const accessToken = localStorage.getItem("access")
    if (!accessToken || !WS_BASE_URL) return

    const url = `${WS_BASE_URL}/ws/notifications/?token=${accessToken}`
    const socket = new WebSocket(url)
    socketRef.current = socket  

    socket.onopen = () => {
      setIsConnected(true)
    }

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)  // ✅ fix: parse the message
        if (data.type === "lecture_status_update") {
          setStatusUpdates((prev) => ({
            ...prev,
            [data.lecture_id]: data.status,  // ✅ fix: update state
          }))
        }
      } catch (e) {
        console.error("Failed to parse WS message", e)
      }
    }

    socket.onerror = (e) => console.error("❌ Socket error", e)

    socket.onclose = (e) => {
      setIsConnected(false)

      // Don't reconnect if auth failed
      if (e.code === AUTH_FAILED_CLOSE_CODE) return

      // Auto-reconnect
      reconnectTimeoutRef.current = setTimeout(connect, RECONNECT_DELAY_MS)
    }
  }, [])

  useEffect(() => {
    connect()
    return () => {
      clearTimeout(reconnectTimeoutRef.current)
      socketRef.current?.close()
    }
  }, [connect])

  return (
    <LectureSocketContext.Provider value={{ statusUpdates, isConnected }}>
      {children}
    </LectureSocketContext.Provider>
  )
}

export function useLectureSocket() {
  const context = useContext(LectureSocketContext)
  if (!context) throw new Error("useLectureSocket must be used within a LectureSocketProvider")
  return context
}