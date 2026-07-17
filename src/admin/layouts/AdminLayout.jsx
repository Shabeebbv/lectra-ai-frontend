import { Outlet } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"
import AdminTopbar from "./AdminTopbar"

function AdminLayout() {
  return (
    <div className="bg-[#f9f9ff] min-h-screen">
      <AdminTopbar />
      <AdminSidebar />
      <main className="pt-20 lg:pl-64">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout