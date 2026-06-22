import { useState, useEffect } from "react"
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

  useEffect(() => {

    const token = localStorage.getItem("access")

    if (token) {
      navigate("/dashboard")
    }

  }, [navigate])

  const handleChange = (e) => {

    setError("")

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!formData.phone_number.trim()) {
      setError("Phone number is required")
      return
    }

    if (!formData.password.trim()) {
      setError("Password is required")
      return
    }

    try {

      setLoading(true)
      setError("")

      const response = await api.post(
        "/users/login/",
        formData
      )

      const access = response?.data?.data?.access
      const refresh = response?.data?.data?.refresh

      if (!access || !refresh) {
        throw new Error("Token not received")
      }

      localStorage.setItem("access", access)
      localStorage.setItem("refresh", refresh)

      navigate("/dashboard")

    } catch (error) {

      console.log(error)

      setError(
        error?.response?.data?.message ||
        "Invalid credentials"
      )

    } finally {

      setLoading(false)

    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="w-full max-w-md relative z-10">

        {/* Logo Section */}
        <div className="text-center mb-8 transform transition-all duration-500 hover:scale-105">

          <div className="inline-flex items-center justify-center mb-4">

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-3 shadow-xl">

              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>

            </div>

          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Lectra AI
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Transform videos into intelligent lectures
          </p>

        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">

          <div className="text-center mb-8">

            <h2 className="text-2xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="text-slate-500 mt-1 text-sm">
              Sign in to continue creating amazing lectures
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Phone Number */}
            <div className="relative group">

              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

              </div>

              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                disabled={loading}
                maxLength={15}
                required
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 disabled:opacity-60"
              />

            </div>

            {/* Password */}
            <div className="relative group">

              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>

              </div>

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 disabled:opacity-60"
              />

            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 animate-shake">
                <p className="text-red-600 text-sm text-center">
                  {error}
                </p>
              </div>
            )}

            <div className="flex justify-end">

              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          <div className="mt-6 text-center">

            <p className="text-sm text-slate-600">

              Don't have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
              >
                Create Account
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login