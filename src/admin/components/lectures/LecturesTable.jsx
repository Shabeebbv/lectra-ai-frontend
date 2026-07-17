import { RotateCw } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function LecturesTable({ lectures, loading, onRetry, onDeleteRequest }) {
  if (loading) {
    return <div className="py-16 text-center text-sm text-slate-400">Loading lectures…</div>;
  }

  if (lectures.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-slate-700">No lectures found</p>
        <p className="mt-1 text-sm text-slate-400">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-slate-200">
      <thead>
        <tr className="text-left text-xs font-medium uppercase tracking-wide text-slate-400">
          <th className="py-3 pl-4 pr-3">Title</th>
          <th className="px-3 py-3">Uploaded By</th>
          <th className="px-3 py-3">Status</th>
          <th className="px-3 py-3">Uploaded</th>
          <th className="py-3 pl-3 pr-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {lectures.map((lecture) => (
          <tr key={lecture.id} className="text-sm">
            <td className="py-3 pl-4 pr-3 font-medium text-slate-800">{lecture.title}</td>
            <td className="px-3 py-3 text-slate-500">
              {lecture.uploaded_by}
              <div className="text-xs text-slate-400">{lecture.uploaded_by_email}</div>
            </td>
            <td className="px-3 py-3">
              <StatusBadge status={lecture.status} />
            </td>
            <td className="px-3 py-3 text-slate-500">
              {new Date(lecture.created_at).toLocaleDateString()}
            </td>
            <td className="py-3 pl-3 pr-4 text-right">
              <div className="flex items-center justify-end gap-3">
                {lecture.status === "failed" && (
                  <button
                    onClick={() => onRetry(lecture.id)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    <RotateCw size={12} />
                    Retry
                  </button>
                )}
                <button
                  onClick={() => onDeleteRequest(lecture)}
                  className="text-xs font-medium text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}