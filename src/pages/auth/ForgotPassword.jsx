import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios"

function ForgotPassword() {

  const navigate = useNavigate()

  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {

    const token = localStorage.getItem("access")

    if (token) {
      navigate("/dashboard")
    }

  }, [navigate])

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)
      setError("")

      await api.post(
        "/users/forgot-password/",
        {
          phone_number: phoneNumber,
        }
      )

      navigate("/reset-password", {
        state: {
          phone_number: phoneNumber,
        }
      })

    } catch (error) {

      setError(
        error?.response?.data?.message ||
        "Failed to send OTP"
      )

    } finally {

      setLoading(false)

    }

  }

  const PhoneIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width="20"
      height="20"
      fill="currentColor"
    >
      <path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-120v40h400v-40H280Zm0-80h400v-480H280v480Zm0-560h400v-40H280v40Zm0 640v40-40Zm0-640v-40 40Z" />
    </svg>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>

        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      </div>

      <div className="flex-grow flex items-center justify-center px-4 relative">

        <div className="w-full max-w-md z-10">

          <div className="text-center mb-8">

            <div className="flex justify-center mb-4">

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-cyan-500 to-purple-600 shadow-2xl animate-float">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  width="28"
                  height="28"
                  fill="white"
                >
                  <path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-120v40h400v-40H280Zm0-80h400v-480H280v480Zm0-560h400v-40H280v40Zm0 640v40-40Zm0-640v-40 40Z" />
                </svg>

              </div>

            </div>

            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Forgot Password?
            </h1>

            <p className="text-white/60 text-sm">
              Enter your phone number to receive an OTP
            </p>

          </div>

          <div className="rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div className="space-y-1.5">

                <label className="block text-xs font-medium text-white/70 uppercase tracking-wider">
                  Phone Number
                </label>

                <div className="relative group">

                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors">
                    <PhoneIcon />
                  </span>

                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setError("")
                      setPhoneNumber(e.target.value)
                    }}
                    disabled={loading}
                    className="w-full py-3 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all outline-none text-sm text-white placeholder:text-white/40 disabled:opacity-60"
                    required
                  />

                </div>

              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">

                  <p className="text-red-400 text-sm text-center">
                    {error}
                  </p>

                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-white font-bold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-60 bg-gradient-to-r from-cyan-500 to-purple-600"
              >
                {
                  loading
                    ? "Sending OTP..."
                    : "Send OTP"
                }
              </button>

              <p className="text-center text-sm text-white/60">

                Remember your password?{" "}

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-cyan-400 font-semibold hover:underline"
                >
                  Back to Sign In
                </button>

              </p>

            </form>

          </div>

        </div>

      </div>

      <footer className="w-full py-6 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 border-t border-white/10 backdrop-blur-sm bg-black/20">

        <div className="text-xs text-white/50 mb-4 md:mb-0">
          © 2024 Lectra AI. Empowering intelligence.
        </div>

        <div className="flex flex-wrap justify-center gap-6">

          {["Privacy Policy", "Terms of Service", "Cookie Settings", "Help Center"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs text-white/50 hover:text-white transition-all"
            >
              {item}
            </a>
          ))}

        </div>

      </footer>

    </div>
  )
}

export default ForgotPassword