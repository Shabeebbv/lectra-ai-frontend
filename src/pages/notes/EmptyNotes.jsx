import { FileText } from "lucide-react"

function EmptyNotes() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 border-2 border-dashed border-[#c2c6d6] rounded-2xl">
      <div className="w-12 h-12 rounded-xl bg-[#e7eeff] flex items-center justify-center mb-4">
        <FileText size={22} className="text-[#0058be]/60" />
      </div>
      <p className="font-medium text-[#111c2d]">No notes yet</p>
      <p className="text-sm text-[#424754] mt-1">
        Notes appear here automatically once a lecture finishes processing.
      </p>
    </div>
  )
}

export default EmptyNotes