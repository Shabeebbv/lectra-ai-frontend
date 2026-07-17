import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { analyticsService } from "../services/analyticsService";

export function useAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await analyticsService.getOverview(days);
      setData(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load analytics.");
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { data, loading, days, setDays };
}