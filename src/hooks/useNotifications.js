import { useState, useEffect, useCallback } from "react"
import api from "../api/axios"
import { useLectureSocket } from "../context/LectureSocketContext"

/**
 * Fetches notifications + unread count for the bell icon.
 * Call markAllRead() when the dropdown is opened to clear the badge.
 *
 * Also re-fetches automatically whenever any lecture's status changes
 * over the WebSocket (statusUpdates) — that's exactly when the backend
 * may have created a new Notification row (e.g. on "completed"). Without
 * this, the bell only ever reflected data from the moment TopNavBar first
 * mounted, so new notifications only appeared after a full remount
 * (e.g. switching pages) instead of live.
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const { statusUpdates } = useLectureSocket()

  const fetchNotifications = useCallback(async () => {
    try {
      const [listRes, countRes] = await Promise.all([
        api.get("/lectures/notifications/"),
        api.get("/lectures/notifications/unread-count/"),
      ])
      setNotifications(listRes?.data?.data ?? listRes?.data ?? [])
      setUnreadCount(countRes?.data?.data?.count ?? 0)
    } catch (err) {
      console.error("Failed to fetch notifications:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial fetch on mount.
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  // Live refetch — statusUpdates gets a new object reference every time
  // the WebSocket delivers a lecture_status_update message, so this
  // fires right when a lecture (and possibly a new notification) changes.
  useEffect(() => {
    fetchNotifications()
  }, [statusUpdates, fetchNotifications])

  const markAllRead = useCallback(async () => {
    if (unreadCount === 0) return
    try {
      await api.post("/lectures/notifications/mark-all-read/")
      setUnreadCount(0)
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
    } catch (err) {
      console.error("Failed to mark notifications read:", err)
    }
  }, [unreadCount])

  return { notifications, unreadCount, isLoading, markAllRead, refetch: fetchNotifications }
}