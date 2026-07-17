import { Link } from "react-router-dom";
import { useDeletedUsers } from "../hooks/useDeletedUsers";
import DeletedUsersTable from "../components/users/DeletedUsersTable";

const PAGE_SIZE = 20;

export default function DeletedUsers() {
  const { users, loading, page, setPage, totalCount, restoreUser } = useDeletedUsers();
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Deleted Users</h1>
          <p className="mt-1 text-sm text-slate-500">{totalCount} total</p>
        </div>
        <Link
          to="/admin/users"
          className="text-sm font-medium text-slate-500 hover:text-slate-800 underline decoration-dotted underline-offset-2"
        >
          Back to Users
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <DeletedUsersTable users={users} loading={loading} onRestore={restoreUser} />
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg px-3 py-1.5 hover:bg-slate-100 disabled:opacity-40"
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg px-3 py-1.5 hover:bg-slate-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}