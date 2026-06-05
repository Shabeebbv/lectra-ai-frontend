import Sidebar from "../components/common/Sidebar"
import Topbar from "../components/common/Topbar"

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar />

      <div className="ml-64">

        <Topbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  )
}

export default DashboardLayout