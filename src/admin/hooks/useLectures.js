import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { lectureService } from "../services/lectureService";

export function useLectures() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [filters, setFilters] = useState({
    page: 1,
    search: "",
    status: "",
  });

  const fetchLectures = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page: filters.page };
      if (filters.search) params.search = filters.search;
      if (filters.status) params.status = filters.status;

      const res = await lectureService.list(params);
      setLectures(res.data.data.results);
      setTotalCount(res.data.data.count);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load lectures.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  const setSearch = (value) => setFilters((f) => ({ ...f, search: value, page: 1 }));
  const setStatus = (value) => setFilters((f) => ({ ...f, status: value, page: 1 }));
const setPage = (updater) =>
  setFilters((f) => ({
    ...f,
    page: typeof updater === "function" ? updater(f.page) : updater,
  }));
  // Optimistic retry — flips status to "pending" instantly, reverts on failure.
  const retryLecture = async (id) => {
    const prevLectures = lectures;
    setLectures((l) =>
      l.map((lecture) => (lecture.id === id ? { ...lecture, status: "pending" } : lecture))
    );
    try {
      const res = await lectureService.retry(id);
      toast.success(res.data.message);
    } catch (err) {
      setLectures(prevLectures);
      toast.error(err.response?.data?.message || "Failed to retry lecture.");
    }
  };

  // Optimistic delete — removes the row instantly, reverts on failure.
  const deleteLecture = async (id) => {
    const prevLectures = lectures;
    setLectures((l) => l.filter((lecture) => lecture.id !== id));
    try {
      await lectureService.delete(id);
      toast.success("Lecture deleted successfully.");
    } catch (err) {
      setLectures(prevLectures);
      toast.error(err.response?.data?.message || "Failed to delete lecture.");
    }
  };

  return {
    lectures,
    loading,
    page: filters.page,
    setPage,
    totalCount,
    search: filters.search,
    setSearch,
    status: filters.status,
    setStatus,
    retryLecture,
    deleteLecture,
    refresh: fetchLectures,
  };
}