import { useState, useEffect } from "react";

export default function UsersFilters({ search, setSearch, role, setRole, isBlocked, setIsBlocked }) {
  // Local input state, debounced before it hits the parent filter —
  // prevents a network request firing on every keystroke.
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localSearch !== search) setSearch(localSearch);
    }, 400);
    return () => clearTimeout(timeout);
  }, [localSearch]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="Search by name, email or phone"
        className="w-64 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
      >
        <option value="">All roles</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="super_admin">Super Admin</option>
      </select>

      <select
        value={isBlocked}
        onChange={(e) => setIsBlocked(e.target.value)}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
      >
        <option value="">All status</option>
        <option value="false">Active</option>
        <option value="true">Blocked</option>
      </select>
    </div>
  );
}