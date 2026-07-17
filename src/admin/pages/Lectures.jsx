import { useState } from "react";
import { useLectures } from "../hooks/useLectures";
import LecturesFilters from "../components/lectures/LecturesFilters";
import LecturesTable from "../components/lectures/LecturesTable";
import ConfirmDialog from "../components/users/ConfirmDialog";

const PAGE_SIZE = 20;

export default function Lectures() {
  const {
    lectures,
    loading,
    page,
    setPage,
    totalCount,
    search,
    setSearch,
    status,
    setStatus,
    retryLecture,
    deleteLecture,
  } = useLectures();

  const [pendingDelete, setPendingDelete] = useState(null);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const handleConfirmDelete = async () => {
    await deleteLecture(pendingDelete.id);
    setPendingDelete(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Lectures</h1>
        <p className="mt-1 text-sm text-slate-500">{totalCount} total</p>
      </div>

      <div className="mb-4">
        <LecturesFilters search={search} setSearch={setSearch} status={status} setStatus={setStatus} />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <LecturesTable
          lectures={lectures}
          loading={loading}
          onRetry={retryLecture}
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

      <ConfirmDialog
        open={!!pendingDelete}
        title="Permanently delete this lecture?"
        message={`"${pendingDelete?.title}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete permanently"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      >
        <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
          This also deletes the transcript, AI notes, tutor conversation history, and timeline highlights for this lecture.
        </div>
      </ConfirmDialog>
    </div>
  );
}