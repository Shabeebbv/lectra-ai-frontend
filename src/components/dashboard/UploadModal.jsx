import UploadZone from "./UploadZone"

function UploadModal({ onClose, onFileSelected }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#111c2d]">Upload Lecture</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-[#424754] hover:text-[#111c2d]"
          >
            Close
          </button>
        </div>

        <UploadZone onFileSelected={onFileSelected} />
      </div>
    </div>
  )
}

export default UploadModal