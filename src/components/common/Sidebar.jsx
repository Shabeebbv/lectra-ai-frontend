import { Link, useLocation } from "react-router-dom"
import { X } from "lucide-react"
import {
  SIDEBAR_NAV_ITEMS,
  SIDEBAR_FOOTER_ITEMS,
} from "../../config/navItems"


function SidebarLink({
  label,
  icon: Icon,
  path,
  isActive,
  onNavigate,
}) {
  const baseClasses =
    "flex items-center gap-3 p-3 rounded-lg text-sm transition-all"

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
      onClick={onNavigate}
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


function SidebarContent({ onClose }) {
  const { pathname } = useLocation()

  return (
    <>
      {/* Logo */}
      <div className="mb-10 px-2">
        <h1 className="text-xl font-black text-[#0058be]">
          LectaSync AI
        </h1>

        <p className="text-sm text-[#424754] opacity-70">
          Intelligent Learning
        </p>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        {SIDEBAR_NAV_ITEMS.map((item) => (
          <SidebarLink
            key={item.label}
            {...item}
            isActive={pathname === item.path}
            onNavigate={onClose}
          />
        ))}
      </nav>

      {/* Footer navigation */}
      <div className="mt-auto border-t border-[#c2c6d6] pt-4 flex flex-col gap-1">
        {SIDEBAR_FOOTER_ITEMS.map((item) => (
          <SidebarLink
            key={item.label}
            {...item}
            isActive={pathname === item.path}
            onNavigate={onClose}
          />
        ))}
      </div>
    </>
  )
}


function Sidebar({
  mobileOpen = false,
  onMobileClose = () => {},
}) {
  return (
    <>
      {/* ============================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ============================= */}

      <aside
        className="
          hidden
          lg:flex
          flex-col
          fixed
          left-0
          top-0
          h-full
          w-64
          p-4
          z-50
          bg-white
          border-r
          border-[#c2c6d6]
          pt-20
        "
      >
        <SidebarContent />
      </aside>


      {/* ============================= */}
      {/* MOBILE OVERLAY */}
      {/* ============================= */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onMobileClose}
          className="
            lg:hidden
            fixed
            inset-0
            z-[60]
            bg-black/40
            backdrop-blur-[1px]
          "
        />
      )}


      {/* ============================= */}
      {/* MOBILE SIDEBAR */}
      {/* ============================= */}

      <aside
        className={`
          lg:hidden
          fixed
          left-0
          top-0
          bottom-0
          z-[70]
          w-[280px]
          max-w-[85vw]
          bg-white
          border-r
          border-[#c2c6d6]
          shadow-2xl
          flex
          flex-col
          p-4
          pt-20
          transition-transform
          duration-300
          ease-in-out

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onMobileClose}
          aria-label="Close navigation menu"
          className="
            absolute
            top-5
            right-4
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
            text-[#424754]
            hover:bg-[#f0f3ff]
            transition-colors
          "
        >
          <X size={22} />
        </button>

        <SidebarContent
          onClose={onMobileClose}
        />
      </aside>
    </>
  )
}

export default Sidebar