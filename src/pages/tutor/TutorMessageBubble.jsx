import { Sparkles } from "lucide-react"
import ReactMarkdown from "react-markdown"

function TutorMessageBubble({ question, answer }) {
  return (
    <div className="flex flex-col gap-3">
      {/* User question */}
      <div className="flex justify-end">
        <div className="max-w-[75%] bg-[#0058be] text-white rounded-2xl rounded-br-md px-4 py-2.5 text-sm">
          {question}
        </div>
      </div>

      {/* AI answer */}
      <div className="flex justify-start gap-2 items-start">
        <div className="w-7 h-7 rounded-full bg-[#e7eeff] flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles size={14} className="text-[#0058be]" />
        </div>
        <div className="max-w-[75%] bg-[#f0f3ff] rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-[#111c2d]">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="leading-relaxed mb-1.5 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 space-y-0.5 mb-1.5">{children}</ul>,
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            }}
          >
            {answer}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default TutorMessageBubble