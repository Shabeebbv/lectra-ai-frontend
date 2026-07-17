import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import api from "../../api/axios"
import { useCurrentUser } from "../../hooks/useCurrentUser"

function AdminTopbar() {
  const navigate = useNavigate()
  const currentUser = useCurrentUser()

  const handleLogout = async () => {
    try {
      await api.post("/users/logout/", { refresh: localStorage.getItem("refresh") })
    } catch (error) {
      console.error(error)
    } finally {
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      navigate("/login")
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-[#f9f9ff]/80 backdrop-blur-md border-b border-[#c2c6d6] lg:pl-72">
      <span className="text-sm font-medium text-[#424754]">
        {currentUser?.fullName ? `Welcome, ${currentUser.fullName}` : "Admin"}
      </span>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
      >
        <LogOut size={16} />
        Logout
      </button>
    </header>
  )
}

export default AdminTopbar