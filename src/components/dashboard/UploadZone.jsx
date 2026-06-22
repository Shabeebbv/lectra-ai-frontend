import { useRef, useState } from "react"
import { AudioLines, UploadCloud, FileCheck2, X } from "lucide-react"
import { formatFileSize } from "../../utils/formatFileSize"

const ACCEPTED_TYPES = "video/*,audio/*"

function UploadZone({ onFileSelected }) {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const selectFile = (selected) => {
    if (!selected) return
    setFile(selected)
    onFileSelected?.(selected)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    selectFile(e.dataTransfer.files?.[0])
  }

  const handleBrowseClick = () => inputRef.current?.click()

  const handleInputChange = (e) => selectFile(e.target.files?.[0])

  const clearFile = (e) => {
    e.stopPropagation()
    setFile(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={!file ? handleBrowseClick : undefined}
      className={`relative rounded-3xl p-16 text-center transition-colors cursor-pointer
        border-2 border-dashed
        ${
          isDragging
            ? "border-indigo-400 bg-indigo-50/50"
            : "border-slate-300 bg-white hover:border-slate-400"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        onChange={handleInputChange}
        className="hidden"
      />

      {!file ? (
        <>
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <AudioLines size={26} className="text-indigo-600" />
          </div>

          <h2 className="font-serif text-3xl text-slate-900 mb-2">
            Upload Lecture
          </h2>
          <p className="text-slate-500 mb-7">
            Drag and drop a video or audio file to get started.
          </p>

          <button
            type="button"
            onClick={handleBrowseClick}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                       text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            <UploadCloud size={18} />
            Browse Files
          </button>
        </>
      ) : (
        <div
          className="flex items-center justify-between gap-4 bg-slate-50 border border-slate-200
                     rounded-2xl px-6 py-5 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <FileCheck2 size={20} className="text-emerald-600" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-slate-900 truncate">{file.name}</p>
              <p className="text-sm text-slate-400">{formatFileSize(file.size)}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearFile}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
            title="Remove file"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

export default UploadZone