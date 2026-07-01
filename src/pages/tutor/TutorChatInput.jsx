import { useState } from "react"
import { Send } from "lucide-react"

function TutorChatInput({ onSend, isDisabled }) {
  const [value, setValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || isDisabled) return

    onSend(trimmed)
    setValue("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-[#c2c6d6] bg-white">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask something about this lecture..."
        disabled={isDisabled}
        className="flex-1 h-11 px-4 bg-[#f0f3ff] border border-transparent rounded-xl text-sm outline-none
                   focus:ring-2 focus:ring-[#0058be]/30 focus:border-[#0058be] transition-all
                   disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={isDisabled || !value.trim()}
        className="w-11 h-11 rounded-xl bg-[#0058be] text-white flex items-center justify-center
                   hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
      >
        <Send size={18} />
      </button>
    </form>
  )
}

export default TutorChatInput