import { useState, useRef, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"
import { jwtDecode } from "jwt-decode"
import { mfaService } from "../../services/mfaService"
import { registerFCMToken } from "../../utils/fcm"

function VerifyMfa() {
  const location = useLocation()
  const navigate = useNavigate()
  const identifier = location.state?.identifier

  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""))
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    if (!identifier) navigate("/login")
  }, [identifier, navigate])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const next = [...otpDigits]
    next[index] = value.slice(-1)
    setOtpDigits(next)
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0)
      inputRefs.current[index - 1]?.focus()
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const digits = [...paste.split(""), ...Array(6 - paste.length).fill("")]
    setOtpDigits(digits)
    inputRefs.current[Math.min(paste.length, 5)]?.focus()
  }

  const code = otpDigits.join("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (code.length !== 6) { toast.error("Enter the complete 6-digit code"); return }
    try {
      setLoading(true)
      const res = await mfaService.verifyLogin(identifier, code)
      const access = res?.data?.data?.tokens?.access
      const refresh = res?.data?.data?.tokens?.refresh
      if (!access || !refresh) throw new Error("Token missing")

      localStorage.setItem("access", access)
      localStorage.setItem("refresh", refresh)
      registerFCMToken()
      toast.success("Welcome back!")

      const decoded = jwtDecode(access)
      navigate(decoded.role === "admin" || decoded.role === "super_admin" ? "/admin/dashboard" : "/dashboard")
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid code. Please try again.")
      setOtpDigits(Array(6).fill(""))
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden" style={{ backgroundColor: "#f9f9ff", fontFamily: "Inter, sans-serif" }}>
      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2170e4] text-white mb-4 shadow-sm">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-[32px] font-semibold text-[#111c2d] tracking-tight">Two-Factor Verification</h1>
            <p className="text-[16px] text-[#424754] mt-2">Enter the code from your authenticator app</p>
          </div>

          <div className="bg-white border border-[#c2c6d6] rounded-2xl p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="flex justify-between gap-2" onPaste={handlePaste}>
                {otpDigits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    autoFocus={i === 0}
                    className="w-12 h-14 text-center text-[24px] font-semibold bg-[#e7eeff] border-2 border-transparent focus:border-[#0058be] focus:bg-[#f0f3ff] rounded-xl transition-all duration-200 outline-none"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="w-full h-14 bg-[#0058be] text-white text-[14px] font-medium rounded-xl flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify & Sign In"}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-[14px] font-medium text-[#424754] hover:text-[#0058be] transition-colors">
              Wrong account? Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default VerifyMfa