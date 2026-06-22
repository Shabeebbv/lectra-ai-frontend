import { useState } from "react"
import { Video, Timer, Sparkles, Upload, Plus } from "lucide-react"
import TopNavBar from "../../components/common/Topbar"
import Sidebar from "../../components/common/sidebar"
import StatCard from "../../components/dashboard/StatCard"
import RecentLectures from "../../components/dashboard/RecentLectures"
import LearningTimeline from "../../components/dashboard/LearningTimeline"
import AIInsights from "../../components/dashboard/AIInsights"
import LiveTranscript from "../../components/dashboard/LiveTranscript"
import UploadModal from "../../components/dashboard/UploadModal"
import { useLectures } from "../../hooks/useLectures"

function Dashboard() {
  const { lectures } = useLectures()
  const [showUploadModal, setShowUploadModal] = useState(false)

  const totalLectures = lectures.length
  const completedCount = lectures.filter((l) => l.status === "completed").length

  return (
    <div className="text-[#111c2d] bg-[#f9f9ff] min-h-screen">
      <TopNavBar />
      <Sidebar />

      <main className="pt-24 pb-12 px-6 lg:ml-64">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-semibold">Welcome back.</h2>
              <p className="text-lg text-[#424754]">
                Ready to master today&apos;s complex concepts?
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 bg-[#0058be] text-white px-6 py-3 rounded-xl font-bold
                         shadow-lg shadow-[#0058be]/20 hover:opacity-90 active:scale-95 transition-all"
            >
              <Upload size={18} />
              Upload Lecture
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard
              icon={Video}
              iconBgClass="bg-[#d8e2ff]"
              iconColorClass="text-[#0058be]"
              label="Total Lectures"
              value={totalLectures}
            />
            <StatCard
              icon={Timer}
              iconBgClass="bg-[#d3e4fe]"
              iconColorClass="text-[#38485d]"
              label="Completed"
              value={completedCount}
            />
            <StatCard
              icon={Sparkles}
              iconBgClass="bg-[#dee8ff]"
              iconColorClass="text-[#545d62]"
              // Notes-generated count needs a backend aggregate — placeholder for now
              label="Notes Generated"
              value="—"
            />
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-8 flex flex-col gap-6">
              <RecentLectures />
              <LearningTimeline />
            </section>

            <aside className="lg:col-span-4 flex flex-col gap-6">
              <AIInsights />
              <LiveTranscript />
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="w-14 h-14 rounded-full bg-[#0058be] text-white shadow-xl flex items-center justify-center active:scale-95 transition-transform"
        >
          <Plus size={24} />
        </button>
      </div>

      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onFileSelected={(file) => console.log("Selected lecture file:", file)}
        />
      )}
    </div>
  )
}

export default Dashboard