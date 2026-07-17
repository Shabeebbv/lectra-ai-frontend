import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { userService } from "../services/userService";

export function useDeletedUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchDeletedUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await userService.listDeleted({ page });
      setUsers(res.data.data.results);
      setTotalCount(res.data.data.count);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load deleted users.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchDeletedUsers();
  }, [fetchDeletedUsers]);

  const restoreUser = async (id) => {
    const prevUsers = users;
    setUsers((u) => u.filter((user) => user.id !== id));
    try {
      const res = await userService.restore(id);
      toast.success(res.data.message);
    } catch (err) {
      setUsers(prevUsers);
      toast.error(err.response?.data?.message || "Failed to restore user.");
    }
  };

  return { users, loading, page, setPage, totalCount, restoreUser };
}