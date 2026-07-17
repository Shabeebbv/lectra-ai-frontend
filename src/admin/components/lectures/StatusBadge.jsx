const STATUS_STYLES = {
  pending: "bg-slate-50 text-slate-600 ring-slate-500/20",
  processing: "bg-blue-50 text-blue-700 ring-blue-600/20",
  transcribing: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  completed: "bg-green-50 text-green-700 ring-green-600/20",
  failed: "bg-red-50 text-red-700 ring-red-600/20",
};

const STATUS_LABELS = {
  pending: "Pending",
  processing: "Processing",
  transcribing: "Transcribing",
  completed: "Completed",
  failed: "Failed",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}