import { useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronLeft, Sparkles } from "lucide-react"
import Sidebar from "../../components/common/Sidebar"
import TopNavBar from "../../components/common/Topbar"
import TutorMessageBubble from "./TutorMessageBubble"
import TutorChatInput from "./TutorChatInput"
import { useLectureDetail } from "../../hooks/useLectureDetail"
import { useTutorChat } from "../../hooks/useTutorChat"

function TutorChat() {
  const { id } = useParams()
  const { lecture, isLoading: isLoadingLecture } = useLectureDetail(id)
  const { messages, isLoadingHistory, isAsking, error, askQuestion } = useTutorChat(id)
  const bottomRef = useRef(null)

  const isLectureReady = lecture?.status === "completed"

  // Scroll to the bottom whenever a new message arrives or a question is
  // being asked — so the user always sees the latest exchange without
  // having to manually scroll down in a long conversation.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isAsking])

  return (
    <div className="bg-[#f9f9ff] text-[#111c2d] h-screen overflow-hidden">
      <TopNavBar />
      <Sidebar />

      <main className="lg:ml-64 h-screen flex flex-col pt-16">
        <div className="px-6 py-4 border-b border-[#c2c6d6] bg-white flex items-center gap-3">
          <Link to="/tutor" className="text-[#0058be] hover:underline shrink-0">
            <ChevronLeft size={20} />
          </Link>
          <div className="min-w-0">
            <p className="text-xs text-[#424754] uppercase tracking-wide">AI Tutor</p>
            <h2 className="text-base font-semibold truncate">
              {isLoadingLecture ? "Loading..." : lecture?.title}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 max-w-3xl mx-auto w-full">
          {!isLoadingLecture && !isLectureReady && (
            <p className="text-sm text-[#ba1a1a] text-center py-8">
              This lecture isn't fully processed yet — come back once it's completed.
            </p>
          )}

          {isLectureReady && isLoadingHistory && (
            <p className="text-sm text-[#424754] text-center py-8">Loading conversation...</p>
          )}

          {isLectureReady && !isLoadingHistory && messages.length === 0 && (
            <div className="flex flex-col items-center text-center py-12 gap-3">
              <div className="w-12 h-12 rounded-full bg-[#e7eeff] flex items-center justify-center">
                <Sparkles size={22} className="text-[#0058be]" />
              </div>
              <p className="font-medium">Ask anything about this lecture</p>
              <p className="text-sm text-[#424754] max-w-sm">
                The tutor answers using only what's in this lecture's transcript.
              </p>
            </div>
          )}

          {isLectureReady && !isLoadingHistory && messages.length > 0 && (
            <div className="flex flex-col gap-6">
              {messages.map((message) => (
                <TutorMessageBubble
                  key={message.id}
                  question={message.question}
                  answer={message.answer}
                />
              ))}

              {/* Shown while waiting for an answer */}
              {isAsking && (
                <div className="flex justify-start gap-2 items-center">
                  <div className="w-7 h-7 rounded-full bg-[#e7eeff] flex items-center justify-center shrink-0">
                    <Sparkles size={14} className="text-[#0058be]" />
                  </div>
                  <div className="bg-[#f0f3ff] rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-[#424754]">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          )}

          {error && <p className="text-sm text-[#ba1a1a] text-center mt-4">{error}</p>}

          {/* Invisible anchor element — scrollIntoView() targets this */}
          <div ref={bottomRef} />
        </div>

        <div className="max-w-3xl mx-auto w-full">
          <TutorChatInput onSend={askQuestion} isDisabled={!isLectureReady || isAsking} />
        </div>
      </main>
    </div>
  )
}

export default TutorChat