import { Link, useLocation,useNavigate  } from "react-router-dom"
import { Bell, Settings,LogOut  } from "lucide-react"
import { TOPNAV_ITEMS } from "../../config/navItems"
import { useState } from "react"
import api from "../../api/axios"

function TopNavBar() {
  const { pathname } = useLocation()

const [open, setOpen] = useState(false)
const navigate = useNavigate()

const handleLogout = async () => {
  try {
    await api.post("/users/logout/", {
      refresh: localStorage.getItem("refresh"),
    })

    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    navigate("/login")
  } catch (error) {
    console.error(error)
    // Still clear tokens and redirect even if logout fails
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    navigate("/login")
  }
}

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

<div className="relative">
  <button
    onClick={() => setOpen(!open)}
    className="h-8 w-8 rounded-full border border-[#c2c6d6] bg-[#d8e2ff] flex items-center justify-center text-xs font-semibold text-[#0058be]"
  >
    User
  </button>

  {open && (
    <div className="absolute right-0 mt-2 w-40 bg-white border border-[#c2c6d6] rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  )}
</div>
      </div>
    </header>
  )
}

export default TopNavBar