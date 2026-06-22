// Maps Lecture.status (backend) -> how it's displayed in the UI.
// Keep this in sync with the Lecture model's STATUS choices.
export const LECTURE_STATUS = {
  pending: {
    label: "Pending",
    badgeClass: "bg-slate-100 text-slate-600",
    canPlay: false,
  },
  processing: {
    label: "Processing",
    badgeClass: "bg-amber-100 text-amber-700",
    canPlay: false,
  },
  completed: {
    label: "Completed",
    badgeClass: "bg-emerald-100 text-emerald-700",
    canPlay: true,
  },
  failed: {
    label: "Failed",
    badgeClass: "bg-rose-100 text-rose-700",
    canPlay: false,
  },
}

export function getStatusMeta(status) {
  return LECTURE_STATUS[status] ?? LECTURE_STATUS.pending
}