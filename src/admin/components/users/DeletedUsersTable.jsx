export default function DeletedUsersTable({ users, loading, onRestore }) {
  if (loading) {
    return <div className="py-16 text-center text-sm text-slate-400">Loading…</div>;
  }

  if (users.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-slate-700">Trash is empty</p>
        <p className="mt-1 text-sm text-slate-400">Deleted users will show up here.</p>
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-slate-200">
      <thead>
        <tr className="text-left text-xs font-medium uppercase tracking-wide text-slate-400">
          <th className="py-3 pl-4 pr-3">Name</th>
          <th className="px-3 py-3">Contact</th>
          <th className="px-3 py-3">Deleted</th>
          <th className="py-3 pl-3 pr-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {users.map((user) => (
          <tr key={user.id} className="text-sm">
            <td className="py-3 pl-4 pr-3 font-medium text-slate-800">{user.full_name}</td>
            <td className="px-3 py-3 text-slate-500">{user.email || user.phone_number}</td>
            <td className="px-3 py-3 text-slate-500">
              {user.deleted_at ? new Date(user.deleted_at).toLocaleDateString() : "—"}
            </td>
            <td className="py-3 pl-3 pr-4 text-right">
              <button
                onClick={() => onRestore(user.id)}
                className="text-xs font-medium text-green-600 hover:text-green-800"
              >
                Restore
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}