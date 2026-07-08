import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"
import api from "../../api/axios"
import IdentifierInput from "../../components/IdentifierInput"
import { isEmail } from "../../utils/identifier"

function Login() {
  const navigate = useNavigate()
  const [identifierState, setIdentifierState] = useState({ identifier: "", valid: false, mode: null })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("access")) navigate("/dashboard")
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!identifierState.valid) {
      toast.error(
        identifierState.mode === "phone"
          ? "Enter a valid 10-digit phone number"
          : "Enter a valid email address"
      )
      return
    }

    const value = identifierState.identifier

    try {
      setLoading(true)
      await api.post("/users/login/", { identifier: value })
      toast.success(`OTP sent to your ${isEmail(value) ? "email" : "number"}!`)
      navigate("/verify-login-otp", { state: { identifier: value } })
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong"
      if (msg.toLowerCase().includes("not found")) {
        toast.error("No account found with this email/number")
      } else if (msg.toLowerCase().includes("verified")) {
        toast.error("Account not verified. Please register first.")
      } else {
        toast.error(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-12 relative"
      style={{
        background: [
          "radial-gradient(circle at 0% 0%, #ede9fe 0%, transparent 50%)",
          "radial-gradient(circle at 100% 0%, #e0f2fe 0%, transparent 50%)",
          "radial-gradient(circle at 100% 100%, #f0fdf4 0%, transparent 50%)",
          "radial-gradient(circle at 0% 100%, #faf5ff 0%, transparent 50%)",
          "#f9f9ff",
        ].join(", "),
        fontFamily: "Inter, sans-serif",
      }}
    >
      <main className="relative z-10 w-full max-w-[520px] py-10 flex flex-col items-center">

        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#2170e4] rounded-2xl mb-4 shadow-xl shadow-[#0058be]/10">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-[32px] font-semibold leading-10 tracking-tight text-[#0058be]">Lectra AI</h1>
          <p className="text-[16px] text-[#424754] mt-1">Intelligent Learning Ecosystem</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-10 w-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.70)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.30)",
            boxShadow: "0 8px 32px 0 rgba(31,38,135,0.04)",
          }}
        >
          <header className="mb-6">
            <h2 className="text-[20px] font-semibold text-[#111c2d]">Welcome back</h2>
            <p className="text-[14px] text-[#424754] mt-1">Sign in to your scholarly dashboard</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Identifier */}
            <div className="space-y-2">
              <label className="block text-[12px] font-semibold text-[#424754] uppercase tracking-widest ml-1">
                Email or Phone Number
              </label>
              <IdentifierInput
                onChange={setIdentifierState}
                disabled={loading}
                inputClassName="w-full h-14 px-4 bg-white border border-[#c2c6d6]/50 rounded-xl text-[16px] text-[#111c2d] placeholder:text-[#c2c6d6] focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] outline-none transition-all"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading || !identifierState.valid}
              className="w-full h-14 bg-[#0058be] text-white text-[14px] font-medium rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#0058be]/15 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                <>
                  Send OTP
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <footer className="mt-10 pt-10 border-t border-[#c2c6d6]/20 text-center">
            <p className="text-[14px] text-[#424754]">
              New to Lectra AI?{" "}
              <Link to="/register" className="text-[#0058be] font-bold hover:underline ml-1">
                Create an account
              </Link>
            </p>
          </footer>
        </div>

        {/* Insight box */}
        <div
          className="mt-10 p-6 rounded-2xl flex items-start gap-4 w-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.40)",
            border: "1px solid rgba(255,255,255,0.60)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="w-12 h-12 bg-[#54647a] rounded-full flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#38485d]">Lectra AI Insight</p>
            <p className="text-[14px] text-[#38485d]/80 mt-1 leading-relaxed">
              OTP authentication provides a secure, password-less entry to your learning vault.
              Use whichever contact — email or phone — you registered with.
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 text-center opacity-60">
          <nav className="flex justify-center gap-6 mb-3">
            {["Privacy Policy", "Terms of Service", "Help Center"].map((item) => (
              <a key={item} href="#" className="text-[12px] text-[#424754] hover:text-[#0058be] transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <p className="text-[12px] text-[#424754]">© 2024 Lectra AI. All rights reserved.</p>
        </div>

      </main>
    </div>
  )
}

export default Login