import { Link, useLocation } from "react-router-dom"
import { Bell, Settings } from "lucide-react"
import { TOPNAV_ITEMS } from "../../config/navItems"

function TopNavBar() {
  const { pathname } = useLocation()

  return (
    <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-[#f9f9ff]/80 backdrop-blur-md border-b border-[#c2c6d6]">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-[#0058be]">LectaSync</span>

        <nav className="hidden md:flex items-center gap-6 ml-10">
          {TOPNAV_ITEMS.map((item) => {
            const isActive = pathname === item.path
            const sharedClasses = "py-1 px-1 text-sm rounded transition-colors"

            if (!item.path) {
              return (
                <span
                  key={item.label}
                  className={`${sharedClasses} text-[#424754]/40 cursor-not-allowed`}
                  title="Coming soon"
                >
                  {item.label}
                </span>
              )
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`${sharedClasses} ${
                  isActive
                    ? "text-[#0058be] font-bold border-b-2 border-[#0058be]"
                    : "text-[#424754] hover:bg-[#f0f3ff]"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-full hover:bg-[#f0f3ff] transition-colors text-[#424754]"
          title="Notifications"
        >
          <Bell size={20} />
        </button>

        <button
          className="p-2 rounded-full hover:bg-[#f0f3ff] transition-colors text-[#424754]"
          title="Settings"
        >
          <Settings size={20} />
        </button>

        <div className="h-8 w-8 rounded-full overflow-hidden border border-[#c2c6d6] bg-[#d8e2ff] flex items-center justify-center text-xs font-semibold text-[#0058be]">
          {/* Replace with the user's avatar/initials once profile data is available */}
          U
        </div>
      </div>
    </header>
  )
}

export default TopNavBar