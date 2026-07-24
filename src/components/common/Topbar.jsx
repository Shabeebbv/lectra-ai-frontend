import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom"

import {
  Bell,
  Settings,
  LogOut,
  Menu,
} from "lucide-react"

import { TOPNAV_ITEMS } from "../../config/navItems"

import { useState } from "react"

import api from "../../api/axios"

import { useNotifications } from "../../hooks/useNotifications"

import Sidebar from "./Sidebar"


function timeAgo(dateString) {
  const seconds = Math.floor(
    (Date.now() - new Date(dateString)) / 1000
  )

  if (seconds < 60) return "just now"

  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    return `${minutes}m ago`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours}h ago`
  }

  return `${Math.floor(hours / 24)}d ago`
}


function TopNavBar() {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const [notifOpen, setNotifOpen] =
    useState(false)

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false)

  const {
    notifications,
    unreadCount,
    isLoading,
    markAllRead,
  } = useNotifications()


  const handleLogout = async () => {
    try {
      await api.post("/users/logout/", {
        refresh:
          localStorage.getItem("refresh"),
      })
    } catch (error) {
      console.error(error)
    } finally {
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")

      navigate("/")
    }
  }


  const handleBellClick = () => {
    const willOpen = !notifOpen

    setNotifOpen(willOpen)

    setOpen(false)

    setMobileMenuOpen(false)

    if (willOpen) {
      markAllRead()
    }
  }


  const handleMobileMenu = () => {
    setMobileMenuOpen(true)

    setOpen(false)

    setNotifOpen(false)
  }


  return (
    <>
      <header
        className="
          fixed
          top-0
          left-0
          w-full
          z-40
          flex
          justify-between
          items-center
          px-3
          sm:px-6
          h-16
          bg-[#f9f9ff]/80
          backdrop-blur-md
          border-b
          border-[#c2c6d6]
        "
      >

        {/* LEFT SIDE */}

        <div className="flex items-center gap-2 sm:gap-4">

          {/* Mobile hamburger */}

          <button
            type="button"
            onClick={handleMobileMenu}
            className="
              lg:hidden
              p-2
              rounded-lg
              text-[#424754]
              hover:bg-[#f0f3ff]
              transition-colors
            "
            aria-label="Open navigation menu"
          >
            <Menu size={23} />
          </button>


          {/* Logo */}

          <span className="text-lg sm:text-xl font-bold text-[#0058be] whitespace-nowrap">
            LectaSync
          </span>


          {/* Desktop top navigation */}

          <nav className="hidden md:flex items-center gap-6 ml-10">

            {TOPNAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.path

              const sharedClasses =
                "py-1 px-1 text-sm rounded transition-colors"

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


        {/* RIGHT SIDE */}

        <div className="flex items-center gap-1 sm:gap-2">

          {/* Notification */}

          <div className="relative">

            <button
              onClick={handleBellClick}
              className="
                relative
                p-2
                rounded-full
                hover:bg-[#f0f3ff]
                transition-colors
                text-[#424754]
              "
              title="Notifications"
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    top-0.5
                    right-0.5
                    min-w-[16px]
                    h-4
                    px-1
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-[#ba1a1a]
                    text-white
                    text-[10px]
                    font-semibold
                  "
                >
                  {unreadCount > 9
                    ? "9+"
                    : unreadCount}
                </span>
              )}

            </button>


            {/* Notification dropdown */}

            {notifOpen && (
              <div
                className="
                  fixed
                  sm:absolute
                  left-3
                  right-3
                  sm:left-auto
                  sm:right-0
                  top-16
                  sm:top-auto
                  sm:mt-2
                  sm:w-80
                  bg-white
                  border
                  border-[#c2c6d6]
                  rounded-lg
                  shadow-lg
                  overflow-hidden
                "
              >

                <div className="px-4 py-3 border-b border-[#c2c6d6] font-semibold text-sm text-[#111c2d]">
                  Notifications
                </div>


                <div className="max-h-96 overflow-y-auto">

                  {isLoading && (
                    <p className="text-sm text-[#424754] text-center py-6">
                      Loading...
                    </p>
                  )}


                  {!isLoading &&
                    notifications.length ===
                      0 && (
                      <p className="text-sm text-[#424754] text-center py-6">
                        No notifications yet.
                      </p>
                    )}


                  {!isLoading &&
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`px-4 py-3 border-b border-[#f0f3ff] last:border-b-0 ${
                          n.is_read
                            ? "bg-white"
                            : "bg-[#f0f3ff]"
                        }`}
                      >
                        <p className="text-sm font-medium text-[#111c2d]">
                          {n.title}
                        </p>

                        <p className="text-xs text-[#424754] mt-0.5">
                          {n.body}
                        </p>

                        <p className="text-[11px] text-[#727785] mt-1">
                          {timeAgo(
                            n.created_at
                          )}
                        </p>
                      </div>
                    ))}

                </div>

              </div>
            )}

          </div>


          {/* Settings */}

          <button
            className="
              hidden
              sm:block
              p-2
              rounded-full
              hover:bg-[#f0f3ff]
              transition-colors
              text-[#424754]
            "
            title="Settings"
          >
            <Settings size={20} />
          </button>


          {/* User menu */}

          <div className="relative">

            <button
              onClick={() => {
                setOpen(!open)

                setNotifOpen(false)

                setMobileMenuOpen(false)
              }}
              className="
                h-8
                w-8
                rounded-full
                border
                border-[#c2c6d6]
                bg-[#d8e2ff]
                flex
                items-center
                justify-center
                text-[10px]
                sm:text-xs
                font-semibold
                text-[#0058be]
              "
            >
              User
            </button>


            {open && (
              <div
                className="
                  absolute
                  right-0
                  mt-2
                  w-40
                  bg-white
                  border
                  border-[#c2c6d6]
                  rounded-lg
                  shadow-lg
                  overflow-hidden
                "
              >

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-2
                    px-4
                    py-3
                    text-sm
                    text-red-500
                    hover:bg-red-50
                  "
                >
                  <LogOut size={16} />

                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </header>


      {/* Mobile sidebar */}

      <Sidebar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() =>
          setMobileMenuOpen(false)
        }
      />

    </>
  )
}

export default TopNavBar