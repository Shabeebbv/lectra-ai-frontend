import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios"

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)
      setError("")

      const response = await api.post(
        "/users/login/",
        formData
      )

      const access = response.data.data.access
      const refresh = response.data.data.refresh

      localStorage.setItem("access", access)
      localStorage.setItem("refresh", refresh)

      navigate("/dashboard")

    } catch (error) {

      console.log(error.response?.data)

      setError(
        error.response?.data?.message ||
        "Invalid credentials"
      )

    } finally {

      setLoading(false)

    }

  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-indigo-600">
            Lectra AI
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-semibold text-center mb-6">
            Sign In
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}
            <div className="text-right">

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-indigo-600 hover:text-indigo-700 text-sm"
            >
              Forgot Password?
            </button>

          </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Login    