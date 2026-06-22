import { Sparkles } from "lucide-react"

function SummaryCard({ notes, status }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#c2c6d6] shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#0058be]">Notes</h3>
        <Sparkles size={20} className="text-[#2170e4]" />
      </div>

      {notes ? (
        <p className="text-[#424754] leading-relaxed whitespace-pre-line">{notes}</p>
      ) : (
        <p className="text-[#424754] text-sm">
          {status === "failed"
            ? "Notes couldn't be generated for this lecture."
            : "Notes are still being generated — check back shortly."}
        </p>
      )}
    </div>
  )
}

export default SummaryCard