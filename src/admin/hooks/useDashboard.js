import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { dashboardService } from "../services/dashboardService"

export function useDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    try {
      const res = await dashboardService.getStats()
      setStats(res.data.data)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load dashboard.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return { stats, loading, refresh: fetchStats }
}