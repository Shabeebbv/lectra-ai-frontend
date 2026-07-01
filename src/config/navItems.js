import {
  LayoutDashboard,
  BookOpen,
  FileText,
  History,
  GraduationCap,
  CircleUserRound,
  HelpCircle,
  Settings,
} from "lucide-react"

// Primary items shown in the left sidebar (and mirrored, top 3 only, in the TopNav).
export const SIDEBAR_NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Lectures", icon: BookOpen, path: "/lectures" },
  { label: "My Notes", icon: FileText, path: "/notes" },
  { label: "AI Tutor", icon: GraduationCap, path: "/tutor" },
  { label: "Timeline", icon: History, path: null },
  { label: "Profile", icon: CircleUserRound, path: null },
]

// Secondary items pinned to the bottom of the sidebar.
export const SIDEBAR_FOOTER_ITEMS = [
  { label: "Help", icon: HelpCircle, path: null },
  { label: "Settings", icon: Settings, path: null },
]

// Subset mirrored in the top nav bar, per the design.
export const TOPNAV_ITEMS = SIDEBAR_NAV_ITEMS.slice(0, 3)