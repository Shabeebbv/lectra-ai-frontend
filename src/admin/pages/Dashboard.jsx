import {
  Users,
  ShieldCheck,
  BookOpen,
  Loader,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { useDashboard } from "../hooks/useDashboard"
import StatCard from "../components/dashboard/StatCard"

function Dashboard() {
  const { stats, loading } = useDashboard()

  const cards = [
    { label: "Total Users", value: stats?.total_users, icon: Users, accent: "#0058be" },
    { label: "Admins", value: stats?.total_admins, icon: ShieldCheck, accent: "#7c3aed" },
    { label: "Total Lectures", value: stats?.total_lectures, icon: BookOpen, accent: "#0891b2" },
    { label: "Processing", value: stats?.processing_lectures, icon: Loader, accent: "#d97706" },
    { label: "Completed", value: stats?.completed_lectures, icon: CheckCircle2, accent: "#16a34a" },
    { label: "Failed", value: stats?.failed_lectures, icon: XCircle, accent: "#dc2626" },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#111c2d]">Dashboard</h1>
        <p className="mt-1 text-sm text-[#727785]">Platform overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} loading={loading} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-white border border-[#c2c6d6] rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-[#111c2d] mb-3">Recent Users</h2>
          <p className="text-sm text-[#727785]">
            Not available yet — needs a Recent Users selector on the backend.
          </p>
        </div>
        <div className="bg-white border border-[#c2c6d6] rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-[#111c2d] mb-3">Recent Lectures</h2>
          <p className="text-sm text-[#727785]">
            Not available yet — needs a Recent Lectures selector on the backend.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard