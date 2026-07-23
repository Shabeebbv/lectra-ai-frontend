import { useState, useRef, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"
import api from "../../api/axios"
import { registerFCMToken } from "../../utils/fcm"
import { isEmail } from "../../utils/identifier"
import { jwtDecode } from "jwt-decode"
import { log } from "firebase/firestore/pipelines"
import { useLectureSocket } from "../../context/LectureSocketContext"

function VerifyLoginOtp() {
  const { reconnect } = useLectureSocket()
  const location   = useLocation()
  const navigate   = useNavigate()
  const identifier = location.state?.identifier

  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""))
  const [loading, setLoading]     = useState(false)
  const [resending, setResending] = useState(false)
  const [timeLeft, setTimeLeft]   = useState(300)
  const inputRefs                 = useRef([])

  useEffect(() => {
    if (!identifier) navigate("/")
  }, [identifier, navigate])

  useEffect(() => {
    if (timeLeft <= 0) return
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft])

  const formatTime = (s) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const next  = [...otpDigits]
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
    const paste  = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const digits = [...paste.split(""), ...Array(6 - paste.length).fill("")]
    setOtpDigits(digits)
    inputRefs.current[Math.min(paste.length, 5)]?.focus()
  }

  const otp = otpDigits.join("")

const handleSubmit = async (e) => {
  e.preventDefault()
  if (otp.length !== 6) { toast.error("Enter the complete 6-digit OTP"); return }
  try {
    setLoading(true)
    const res = await api.post("/users/verify-login-otp/", { identifier, otp })

    if (res.data.data.mfa_required) {
      // Admin/super_admin with MFA enabled — hand off to the MFA step
      // instead of storing tokens (none were issued yet).
      navigate("/verify-mfa", { state: { identifier } })
      return
    }

    const access  = res?.data?.data?.tokens?.access
    const refresh = res?.data?.data?.tokens?.refresh
    if (!access || !refresh) throw new Error("Token missing")
    localStorage.setItem("access", access)
    localStorage.setItem("refresh", refresh)
    reconnect()
    registerFCMToken()
    toast.success("Welcome back!")

    const decoded = jwtDecode(access)
    const role = decoded.role

    if (role === "admin" || role === "super_admin") {
      navigate("/admin/dashboard")
    } else {
      navigate("/dashboard")
    }
  } catch (err) {
    const msg = err?.response?.data?.message || ""
    if (msg.toLowerCase().includes("expired")) {
      toast.error("OTP expired. Please login again.")
      navigate("/")
    } else {
      toast.error("Wrong OTP. Please check and try again.")
    }
    setOtpDigits(Array(6).fill(""))
    inputRefs.current[0]?.focus()
  } finally { setLoading(false) }
}

  const handleResend = async () => {
    try {
      setResending(true)
      await api.post("/users/resend-otp/", { identifier, purpose: "login" })
      toast.success("New OTP sent!")
      setOtpDigits(Array(6).fill(""))
      setTimeLeft(300)
      inputRefs.current[0]?.focus()
    } catch (err) {
      const msg = err?.response?.data?.message || ""
      toast.error(msg.toLowerCase().includes("wait")
        ? "Please wait 30 seconds before resending."
        : msg || "Failed to resend OTP")
    } finally { setResending(false) }
  }

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#f9f9ff", fontFamily: "Inter, sans-serif" }}
    >
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0058be]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#505f76]/5 rounded-full blur-[120px]" />
      </div>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">

          {/* Brand */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2170e4] text-white mb-4 shadow-sm">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-[32px] font-semibold text-[#111c2d] tracking-tight">Lectra AI</h1>
            <p className="text-[16px] text-[#424754] mt-2">Identity Verification</p>
          </div>

          {/* Card */}
          <div className="bg-white border border-[#c2c6d6] rounded-2xl p-10 shadow-sm">
            <div className="text-center mb-6">
              <h2 className="text-[20px] font-semibold text-[#111c2d] mb-2">
                Verify your {isEmail(identifier || "") ? "email" : "phone"}
              </h2>
              <p className="text-[14px] text-[#424754] px-2">
                We've sent a 6-digit security code to{" "}
                <span className="font-semibold text-[#0058be]">{identifier}</span>.
                Enter it below to sign in.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* OTP boxes */}
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
                    style={{ boxShadow: digit ? "0 0 0 2px rgba(0,88,190,0.10)" : "none" }}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full h-14 bg-[#0058be] text-white text-[14px] font-medium rounded-xl flex items-center justify-center gap-2 group hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <>
                    Verify OTP
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Timer + resend */}
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-[14px] text-[#424754]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Code expires in:{" "}
                <span className={`font-bold ${timeLeft <= 0 ? "text-[#ba1a1a]" : "text-[#0058be]"}`}>
                  {timeLeft <= 0 ? "Expired" : formatTime(timeLeft)}
                </span>
              </div>

              <div className="h-px w-full bg-[#c2c6d6]/30" />

              <p className="text-[14px] text-[#424754]">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResend}
                  disabled={resending || timeLeft > 270}
                  className="text-[#0058be] font-semibold hover:underline underline-offset-4 disabled:text-[#727785] disabled:cursor-not-allowed transition-colors"
                >
                  {resending ? "Sending..." : "Resend OTP"}
                </button>
              </p>
            </div>
          </div>

          {/* Wrong identifier → back to login */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[#424754] hover:text-[#0058be] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Wrong details? Back to Login
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}

export default VerifyLoginOtp