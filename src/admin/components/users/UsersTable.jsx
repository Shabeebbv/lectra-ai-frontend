import RoleBadge from "./RoleBadge";
import RoleDropdown from "./RoleDropdown";

export default function UsersTable({ users, loading, currentAdminId, onRoleChange, onToggleBlock, onDeleteRequest }) {
  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-slate-400">Loading users…</div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-slate-700">No users found</p>
        <p className="mt-1 text-sm text-slate-400">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-slate-200">
      <thead>
        <tr className="text-left text-xs font-medium uppercase tracking-wide text-slate-400">
          <th className="py-3 pl-4 pr-3">Name</th>
          <th className="px-3 py-3">Contact</th>
          <th className="px-3 py-3">Role</th>
          <th className="px-3 py-3">Status</th>
          <th className="px-3 py-3">Joined</th>
          <th className="py-3 pl-3 pr-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {users.map((user) => {
          const isSuperAdmin = user.role === "super_admin";
          const isSelf = user.id === currentAdminId;

          return (
            <tr key={user.id} className="text-sm">
              <td className="py-3 pl-4 pr-3 font-medium text-slate-800">{user.full_name}</td>
              <td className="px-3 py-3 text-slate-500">{user.email || user.phone_number}</td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                  <RoleBadge role={user.role} />
                  <RoleDropdown
                    currentRole={user.role}
                    disabled={isSuperAdmin}
                    onChange={(newRole) => onRoleChange(user.id, newRole)}
                  />
                </div>
              </td>
              <td className="px-3 py-3">
                <button
                  onClick={() => onToggleBlock(user.id)}
                  disabled={isSuperAdmin || isSelf}
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset disabled:cursor-not-allowed disabled:opacity-50 ${
                    user.is_blocked
                      ? "bg-red-50 text-red-700 ring-red-600/20 hover:bg-red-100"
                      : "bg-green-50 text-green-700 ring-green-600/20 hover:bg-green-100"
                  }`}
                  title={isSuperAdmin ? "Super Admin cannot be blocked" : isSelf ? "You cannot block yourself" : ""}
                >
                  {user.is_blocked ? "Blocked" : "Active"}
                </button>
              </td>
              <td className="px-3 py-3 text-slate-500">
                {new Date(user.date_joined).toLocaleDateString()}
              </td>
              <td className="py-3 pl-3 pr-4 text-right">
                <button
                  onClick={() => onDeleteRequest(user)}
                  disabled={isSuperAdmin || isSelf}
                  className="text-xs font-medium text-red-500 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}