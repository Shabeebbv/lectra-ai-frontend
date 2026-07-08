import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"
import api from "../../api/axios"

function formatTime(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds))
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, "0")}`
}

function Timeline() {
  const { id } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef(null)

  const [lecture, setLecture] = useState(null)
  const [highlights, setHighlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [videoDuration, setVideoDuration] = useState(0)
  const [videoUrl, setVideoUrl] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        const res = await api.get(`/lectures/${id}/timeline/`)
        if (cancelled) return
        setLecture(res.data?.data?.lecture)
        setHighlights(res.data?.data?.highlights || [])
      } catch (err) {
        if (cancelled) return
        const msg = err?.response?.data?.message || "Failed to load timeline"
        setError(msg)
        toast.error(msg)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [id])

  const handleSeek = (startTime) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = startTime
    video.play()
  }

  const lastEnd = highlights.length ? highlights[highlights.length - 1].end_time : 0
  const totalDuration = videoDuration || lastEnd || 1

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="flex items-center gap-3 text-[#424754]">
          <svg className="animate-spin w-6 h-6 text-[#0058be]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
          </svg>
          Loading timeline...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "#f9f9ff" }}>
        <p className="text-[#ba1a1a] text-[14px]">{error}</p>
        <button
          onClick={() => navigate("/lectures")}
          className="text-[#0058be] font-semibold text-[14px] hover:underline"
        >
          Back to lectures
        </button>
      </div>
    )
  }

  const isProcessing = lecture && !["completed", "failed"].includes(lecture.status)

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: "#f9f9ff", fontFamily: "Inter, sans-serif" }}>
      <main className="max-w-5xl mx-auto">

        {/* Header */}
        <header className="mb-8">
          <Link to="/lectures" className="text-[13px] text-[#424754] hover:text-[#0058be] transition-colors inline-flex items-center gap-1 mb-3">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Lectures
          </Link>
          <h1 className="text-[28px] font-semibold text-[#111c2d] tracking-tight">{lecture?.title}</h1>
          <p className="text-[14px] text-[#424754] mt-1">Interactive timeline of key lecture moments</p>
        </header>

        {isProcessing && (
          <div className="mb-8 p-4 rounded-xl bg-[#e0f2fe] border border-[#0058be]/20 flex items-center gap-3">
            <svg className="animate-spin w-5 h-5 text-[#0058be]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
            </svg>
            <p className="text-[14px] text-[#0058be] font-medium">
              This lecture is still processing — timeline highlights will appear once transcription finishes.
            </p>
          </div>
        )}

        {/* Video player */}
        {lecture?.video_file && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-[#c2c6d6]/50 bg-black">
            <video
              ref={videoRef}
              src={lecture.video_file}
              controls
              className="w-full max-h-[420px]"
              onLoadedMetadata={(e) => setVideoDuration(e.target.duration)}
            />
          </div>
        )}

        {/* Lecture flow mini-map — built from real highlight boundaries */}
        {highlights.length > 0 && (
          <div className="mb-8 bg-white border border-[#c2c6d6]/50 rounded-2xl p-5">
            <h3 className="text-[12px] font-semibold text-[#424754] uppercase tracking-widest mb-3">Lecture flow</h3>
            <div className="flex items-center gap-1 h-10">
              {highlights.map((h) => {
                const widthPct = Math.max(2, ((h.end_time - h.start_time) / totalDuration) * 100)
                const isEq = h.highlight_type === "equation"
                return (
                  <div
                    key={h.id}
                    onClick={() => handleSeek(h.start_time)}
                    title={h.title}
                    className={`h-full rounded-sm cursor-pointer transition-opacity hover:opacity-80 ${
                      isEq ? "bg-[#ba1a1a]" : "bg-[#0058be]"
                    }`}
                    style={{ width: `${widthPct}%` }}
                  />
                )
              })}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[11px] text-[#727785]">0:00</span>
              <span className="text-[11px] text-[#727785]">{formatTime(totalDuration)}</span>
            </div>
          </div>
        )}

        {/* Highlights list */}
        {highlights.length === 0 && !isProcessing ? (
          <div className="text-center py-16">
            <p className="text-[14px] text-[#424754]">No timeline highlights available for this lecture yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {highlights.map((h) => {
              const isEquation = h.highlight_type === "equation"
              return (
                <div
                  key={h.id}
                  className={`rounded-2xl p-6 border ${
                    isEquation ? "border-2 border-[#0058be]/10 bg-white" : "border-[#c2c6d6]/50 bg-white/70"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-[#e0f2fe] text-[#0058be] px-3 py-1 rounded-full text-[12px] font-semibold">
                      {formatTime(h.start_time)} - {formatTime(h.end_time)}
                    </span>
                    <button
                      onClick={() => handleSeek(h.start_time)}
                      className="text-[#0058be] text-[13px] font-semibold flex items-center gap-1 hover:underline"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Watch segment
                    </button>
                  </div>

                  {isEquation && h.equation && (
                    <div className="bg-[#f0f3ff] p-6 rounded-xl border border-[#c2c6d6]/50 mb-4 flex items-center justify-center">
                      <p className="font-mono text-[20px] text-[#0058be] text-center">{h.equation}</p>
                    </div>
                  )}

                  <h3 className="text-[18px] font-semibold text-[#111c2d] mb-2">{h.title}</h3>
                  <p className="text-[14px] text-[#424754] leading-relaxed mb-3">{h.description}</p>

                  {h.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {h.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-[#f0f3ff] rounded text-[12px] text-[#424754]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default Timeline