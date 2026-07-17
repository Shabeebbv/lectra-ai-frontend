import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { userService } from "../services/userService";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Single object so search/role/status changes and the page-reset
  // happen in one atomic update — avoids requesting a page that no
  // longer exists after a filter narrows the results.
  const [filters, setFilters] = useState({
    page: 1,
    search: "",
    role: "",
    isBlocked: "",
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page: filters.page };
      if (filters.search) params.search = filters.search;
      if (filters.role) params.role = filters.role;
      if (filters.isBlocked !== "") params.is_blocked = filters.isBlocked;

      const res = await userService.list(params);
      setUsers(res.data.data.results);
      setTotalCount(res.data.data.count);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const setSearch = (value) => setFilters((f) => ({ ...f, search: value, page: 1 }));
  const setRole = (value) => setFilters((f) => ({ ...f, role: value, page: 1 }));
  const setIsBlocked = (value) => setFilters((f) => ({ ...f, isBlocked: value, page: 1 }));
const setPage = (updater) =>
  setFilters((f) => ({
    ...f,
    page: typeof updater === "function" ? updater(f.page) : updater,
  }));
  // Optimistic role change — update the row instantly, revert only on failure.
  const changeRole = async (id, newRole) => {
    const prevUsers = users;
    setUsers((u) => u.map((user) => (user.id === id ? { ...user, role: newRole } : user)));
    try {
      await userService.updateRole(id, newRole);
      toast.success("User role updated successfully.");
    } catch (err) {
      setUsers(prevUsers);
      toast.error(err.response?.data?.message || "Failed to update role.");
    }
  };

  // Optimistic block/unblock — no full-table reload, just flips the pill.
  const toggleBlock = async (id) => {
    const prevUsers = users;
    setUsers((u) =>
      u.map((user) => (user.id === id ? { ...user, is_blocked: !user.is_blocked } : user))
    );
    try {
      const res = await userService.toggleBlock(id);
      toast.success(res.data.message);
    } catch (err) {
      setUsers(prevUsers);
      toast.error(err.response?.data?.message || "Failed to update user status.");
    }
  };

  // Optimistic delete — removes the row instantly, refetches only on failure
  // (soft delete means the row simply won't reappear on a real refresh).
  const deleteUser = async (id) => {
    const prevUsers = users;
    setUsers((u) => u.filter((user) => user.id !== id));
    try {
      await userService.delete(id);
      toast.success("User deleted successfully.");
    } catch (err) {
      setUsers(prevUsers);
      toast.error(err.response?.data?.message || "Failed to delete user.");
    }
  };

  return {
    users,
    loading,
    page: filters.page,
    setPage,
    totalCount,
    search: filters.search,
    setSearch,
    role: filters.role,
    setRole,
    isBlocked: filters.isBlocked,
    setIsBlocked,
    changeRole,
    toggleBlock,
    deleteUser,
    refresh: fetchUsers,
  };
}