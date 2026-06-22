import { useMemo, useState } from "react"
import { AlignLeft, Search } from "lucide-react"

function highlightMatches(text, query) {
  if (!query.trim()) return text

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const parts = text.split(new RegExp(`(${escaped})`, "gi"))

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-[#d8e2ff] text-[#001a42] rounded px-0.5">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

function TranscriptPanel({ transcript, status }) {
  const [query, setQuery] = useState("")

  const content = useMemo(
    () => (transcript ? highlightMatches(transcript, query) : null),
    [transcript, query]
  )

  return (
    <div className="w-full md:w-[400px] lg:w-[480px] bg-white border border-[#c2c6d6] rounded-xl flex flex-col shadow-lg overflow-hidden">
      <div className="p-4 border-b border-[#c2c6d6] flex items-center justify-between bg-[#f0f3ff]/40">
        <div className="flex items-center gap-2 text-[#0058be]">
          <AlignLeft size={20} />
          <h3 className="text-lg font-semibold">Transcript</h3>
        </div>
      </div>

      {transcript && (
        <div className="px-4 pt-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727785]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search transcript..."
              className="w-full pl-9 pr-3 py-2 bg-[#f0f3ff] border-none rounded-full text-sm outline-none
                         focus:ring-2 focus:ring-[#0058be]/40 transition-all"
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        {transcript ? (
          <p className="text-[#111c2d] leading-relaxed whitespace-pre-line">{content}</p>
        ) : (
          <p className="text-[#424754] text-sm">
            {status === "failed"
              ? "Transcript generation failed for this lecture."
              : "Transcript is still being generated — check back shortly."}
          </p>
        )}
      </div>
    </div>
  )
}

export default TranscriptPanel