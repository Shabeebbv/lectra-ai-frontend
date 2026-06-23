import { useState } from "react"
import UploadZone from "./UploadZone"
import ProgressBar from "./Progressbar"
import { useUploadLecture } from "../../hooks/Useuploadlecture "
import { titleFromFilename } from "../../utils/titleFromFilename"

const STATUS_LABELS = {
  "requesting-url": "Preparing upload...",
  uploading: "Uploading video...",
  creating: "Saving lecture...",
}

function UploadModal({ onClose, onUploaded }) {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const { upload, status, progress, error, reset } = useUploadLecture()

  const isBusy = ["requesting-url", "uploading", "creating"].includes(status)

  const handleFileSelected = (selected) => {
    setFile(selected)
    setTitle((current) => current || titleFromFilename(selected.name))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file || !title.trim()) return

    const lecture = await upload({ file, title: title.trim() })
    if (lecture) {
      onUploaded?.(lecture)
    }
  }

  const handleClose = () => {
    if (isBusy) return // don't allow closing mid-upload
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#111c2d]">Upload Lecture</h3>
          <button
            type="button"
            onClick={handleClose}
            disabled={isBusy}
            className="text-sm text-[#424754] hover:text-[#111c2d] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Close
          </button>
        </div>

        {status === "success" ? (
          <SuccessState onDone={onClose} />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <UploadZone onFileSelected={handleFileSelected} />

            {file && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#424754] px-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isBusy}
                  placeholder="Lecture title"
                  className="w-full h-11 px-3 border border-[#c2c6d6] rounded-lg text-sm outline-none
                             focus:ring-2 focus:ring-[#0058be]/30 focus:border-[#0058be] transition-all"
                />
              </div>
            )}

            {isBusy && (
              <div className="space-y-2">
                <ProgressBar percent={status === "uploading" ? progress : 100} />
                <p className="text-sm text-[#424754]">{STATUS_LABELS[status]}</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs text-red-700 underline mt-1"
                >
                  Try again
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={!file || !title.trim() || isBusy}
              className="w-full h-11 bg-[#0058be] text-white font-medium rounded-lg
                         disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all"
            >
              {isBusy ? "Uploading..." : "Upload"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function SuccessState({ onDone }) {
  return (
    <div className="flex flex-col items-center text-center py-6 gap-3">
      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
        <span className="text-emerald-600 text-2xl">✓</span>
      </div>
      <p className="font-medium text-[#111c2d]">Lecture uploaded</p>
      <p className="text-sm text-[#424754]">
        Processing has started — your transcript and notes will be ready shortly.
      </p>
      <button
        type="button"
        onClick={onDone}
        className="mt-2 px-5 py-2 bg-[#0058be] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all"
      >
        Done
      </button>
    </div>
  )
}

export default UploadModal