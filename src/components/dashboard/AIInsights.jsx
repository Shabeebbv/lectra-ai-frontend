import { Sparkles } from "lucide-react"

// Static visual only — wire to real extracted-concepts data once
// the notes/concepts endpoint exists.
const PLACEHOLDER_CONCEPTS = [
  {
    title: "Wave-Particle Duality",
    tag: "Key",
    tagClass: "bg-[#d0e1fb] text-[#54647a]",
    description:
      "The concept that every particle or quantic entity may be described as either a particle or a wave.",
  },
  {
    title: "Probability Amplitude",
    tag: "New",
    tagClass: "bg-[#d8e2ff] text-[#001a42]",
    description:
      "A complex number used in describing the behavior of systems in quantum mechanics.",
  },
]

function AIInsights() {
  return (
    <section className="bg-[#f0f3ff] border border-[#e2e8f0] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={20} className="text-[#0058be]" />
        <h3 className="text-xl font-semibold text-[#004395]">AI Insights</h3>
      </div>

      <p className="text-sm text-[#424754] mb-6">
        Concepts extracted from your most recent lecture will appear here once
        processing is wired up.
      </p>

      <div className="flex flex-col gap-4">
        {PLACEHOLDER_CONCEPTS.map((concept) => (
          <div
            key={concept.title}
            className="p-4 bg-white rounded-xl border border-[#c2c6d6]/30"
          >
            <div className="flex justify-between items-start mb-1">
              <h5 className="text-sm font-bold text-[#111c2d]">{concept.title}</h5>
              <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${concept.tagClass}`}>
                {concept.tag}
              </span>
            </div>
            <p className="text-sm text-[#424754] line-clamp-2">{concept.description}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled
        title="Coming soon"
        className="w-full mt-6 py-3 border border-[#0058be]/40 text-[#0058be]/40 font-bold rounded-xl cursor-not-allowed"
      >
        Full Study Guide
      </button>
    </section>
  )
}

export default AIInsights