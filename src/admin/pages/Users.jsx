import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import UsersFilters from "../components/users/UsersFilters";
import UsersTable from "../components/users/UsersTable";
import ConfirmDialog from "../components/users/ConfirmDialog";
import { useAuth } from "../../context/AuthContext"; // adjust to your actual auth context

const PAGE_SIZE = 20;

export default function Users() {
  const { user: currentAdmin } = useAuth();
  const {
    users,
    loading,
    page,
    setPage,
    totalCount,
    search,
    setSearch,
    role,
    setRole,
    isBlocked,
    setIsBlocked,
    changeRole,
    toggleBlock,
    deleteUser,
  } = useUsers();

  const [pendingDelete, setPendingDelete] = useState(null);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const handleConfirmDelete = async () => {
    await deleteUser(pendingDelete.id);
    setPendingDelete(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Users</h1>
          <p className="mt-1 text-sm text-slate-500">{totalCount} total</p>
        </div>
      </div>

      <div className="mb-4">
        <UsersFilters
          search={search}
          setSearch={setSearch}
          role={role}
          setRole={setRole}
          isBlocked={isBlocked}
          setIsBlocked={setIsBlocked}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <UsersTable
          users={users}
          loading={loading}
          currentAdminId={currentAdmin?.id}
          onRoleChange={changeRole}
          onToggleBlock={toggleBlock}
          onDeleteRequest={setPendingDelete}
        />
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
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg px-3 py-1.5 hover:bg-slate-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this user?"
        message={`${pendingDelete?.full_name} will be removed from active users. This can be reversed from the Deleted Users view.`}
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}