import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Users, BookOpen, Bell, BarChart2, Settings,ShieldCheck } from "lucide-react"

const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Lectures", path: "/admin/lectures", icon: BookOpen },
  // { label: "Notifications", path: "/admin/notifications", icon: Bell },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart2 },
  { label: "Security", path: "/admin/security", icon: ShieldCheck },
  // { label: "Settings", path: "/admin/settings", icon: Settings },
]

function AdminSidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 p-4 z-50 bg-white border-r border-[#c2c6d6] pt-20">
      <div className="mb-10 px-2">
        <h1 className="text-xl font-black text-[#0058be]">Lectra Admin</h1>
        <p className="text-sm text-[#424754] opacity-70">Control Center</p>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {ADMIN_NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <Link
            key={label}
            to={path}
            className={`flex items-center gap-3 p-3 rounded-lg text-sm transition-all ${
              pathname === path
                ? "bg-[#d0e1fb] text-[#54647a] font-bold translate-x-1"
                : "text-[#424754] hover:bg-[#dee8ff]"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
    
export default AdminSidebar