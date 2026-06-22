// Static visual only — wire to the real transcript stream (e.g. via
// Django Channels WebSocket) once that's connected to this page.
const PLACEHOLDER_LINES = [
  {
    time: "12:04",
    text: "The Hamiltonian operator represents the total energy of the system, including both kinetic and potential energy...",
    emphasis: false,
  },
  {
    time: "12:08",
    text: "When we look at the time-independent Schrödinger equation, we are essentially looking for the stationary states...",
    emphasis: true,
  },
  {
    time: "12:15",
    text: "Note: this section was flagged as likely exam-relevant.",
    emphasis: false,
    italic: true,
  },
]

function LiveTranscript() {
  return (
    <section className="bg-white border border-[#e2e8f0] shadow-[0_4px_12px_rgba(30,41,59,0.05)] rounded-2xl p-6 flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-[#111c2d]">Live Transcript</h3>
        <span className="flex items-center gap-1.5 text-[#424754]/50 font-bold text-xs">
          <span className="w-2 h-2 rounded-full bg-[#424754]/40" />
          PREVIEW
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-6">
        {PLACEHOLDER_LINES.map((line) => (
          <div key={line.time} className="flex gap-4">
            <span className="text-sm text-[#0058be] shrink-0 w-12">{line.time}</span>
            <p
              className={`text-sm text-[#424754] ${line.emphasis ? "text-[#111c2d]" : ""} ${
                line.italic ? "italic" : ""
              }`}
            >
              {line.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-[#c2c6d6]">
        <p className="text-xs text-[#424754] text-center">
          Transcript preview — connect a lecture to see live processing here.
        </p>
      </div>
    </section>
  )
}

export default LiveTranscript