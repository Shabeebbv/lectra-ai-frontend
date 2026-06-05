import { useNavigate } from "react-router-dom"
import api from "../../api/axios"
function Topbar() {

  const navigate = useNavigate()

  const handleLogout = async () => {

    try {

      const refresh = localStorage.getItem("refresh")

      await api.post(
        "/users/logout/",
        {
          refresh,
        }
      )

    } catch (error) {

      console.log(error.response?.data)

    } finally {

      localStorage.removeItem("access")
      localStorage.removeItem("refresh")

      navigate("/login")

    }

  }

  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-8">

      <input
        type="text"
        placeholder="Ask AI anything about your lectures..."
        className="border rounded-xl px-4 py-2 w-full max-w-xl"
      />

      <div className="ml-4 flex items-center gap-4">

        <button>🔔</button>

        <button>❔</button>

        <div className="w-10 h-10 bg-indigo-200 rounded-full" />

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </header>
  )
}

export default Topbar