import { Link, useLocation } from "react-router-dom"
import { SIDEBAR_NAV_ITEMS, SIDEBAR_FOOTER_ITEMS } from "../../config/navItems"

function SidebarLink({ label, icon: Icon, path, isActive }) {
  const baseClasses = "flex items-center gap-3 p-3 rounded-lg text-sm transition-all"

  if (!path) {
    return (
      <div
        className={`${baseClasses} text-[#424754]/40 cursor-not-allowed`}
        title="Coming soon"
      >
        <Icon size={20} />
        <span>{label}</span>
      </div>
    )
  }

  return (
    <Link
      to={path}
      className={`${baseClasses} ${
        isActive
          ? "bg-[#d0e1fb] text-[#54647a] font-bold translate-x-1"
          : "text-[#424754] hover:bg-[#dee8ff]"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  )
}

function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 p-4 z-50 bg-white border-r border-[#c2c6d6] pt-20">
      <div className="mb-10 px-2">
        <h1 className="text-xl font-black text-[#0058be]">LectaSync AI</h1>
        <p className="text-sm text-[#424754] opacity-70">Intelligent Learning</p>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {SIDEBAR_NAV_ITEMS.map((item) => (
          <SidebarLink key={item.label} {...item} isActive={pathname === item.path} />
        ))}
      </nav>

      <div className="mt-auto border-t border-[#c2c6d6] pt-4 flex flex-col gap-1">
        {SIDEBAR_FOOTER_ITEMS.map((item) => (
          <SidebarLink key={item.label} {...item} isActive={pathname === item.path} />
        ))}
      </div>
    </aside>
  )
}

export default Sidebar