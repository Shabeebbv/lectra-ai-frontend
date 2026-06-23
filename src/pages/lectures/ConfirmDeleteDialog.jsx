function ConfirmDeleteDialog({ lectureTitle, onConfirm, onCancel, isDeleting }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-[70] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-[#111c2d] mb-2">Delete lecture?</h3>
        <p className="text-sm text-[#424754] mb-6">
          This will permanently delete <span className="font-medium">"{lectureTitle}"</span>{" "}
          and its video, transcript, and notes. This can't be undone.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 h-10 rounded-lg border border-[#c2c6d6] text-sm font-medium text-[#424754]
                       hover:bg-[#f0f3ff] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 h-10 rounded-lg bg-[#ba1a1a] text-white text-sm font-medium
                       hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteDialog