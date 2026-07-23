import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"
import api from "../../api/axios"
import IdentifierInput from "../../components/IdentifierInput"
import { isEmail } from "../../utils/identifier"

function Register() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("")
  const [identifierState, setIdentifierState] = useState({ identifier: "", valid: false, mode: null })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("access")) navigate("/dashboard")
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!fullName.trim()) {
      toast.error("Please enter your full name")
      return
    }
    if (!identifierState.valid) {
      toast.error(
        identifierState.mode === "phone"
          ? "Enter a valid 10-digit phone number"
          : "Enter a valid email address"
      )
      return
    }

    const value = identifierState.identifier
    const payload = isEmail(value)
      ? { full_name: fullName, email: value }
      : { full_name: fullName, phone_number: value }

    try {
      setLoading(true)
      await api.post("/users/register/", payload)
      toast.success(`OTP sent to your ${isEmail(value) ? "email" : "number"}!`)
      navigate("/verify-otp", { state: { identifier: value } })
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed"
      if (msg.toLowerCase().includes("already")) {
        toast.error("This email/number is already registered. Please login.")
      } else {
        toast.error(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    "w-full h-[52px] px-4 bg-white/60 border border-white/80 rounded-xl text-[16px] text-[#111c2d] placeholder:text-[#727785]/50 focus:outline-none focus:border-[#0058be] focus:ring-2 focus:ring-[#0058be]/5 transition-all"

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 md:p-12 overflow-x-hidden"
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
      <main className="relative z-10 w-full max-w-[480px] py-10">

        {/* Card */}
        <div
          className="backdrop-blur-md rounded-3xl p-6 md:p-10"
          style={{
            backgroundColor: "rgba(255,255,255,0.40)",
            border: "1px solid rgba(255,255,255,0.60)",
          }}
        >
          {/* Brand */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-14 h-14 bg-[#0058be]/10 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#0058be]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h1 className="text-[32px] font-semibold leading-10 text-[#111c2d] tracking-tight">Lectra AI</h1>
            <p className="text-[16px] text-[#424754] max-w-[300px] leading-relaxed mt-1">
              Create your academic profile to start your intelligent learning journey.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-[12px] font-semibold text-[#424754] uppercase tracking-wider px-1 opacity-70">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Julian Sterling"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                required
                className={inputClass}
              />
            </div>

            {/* Identifier */}
            <div className="space-y-1">
              <label className="block text-[12px] font-semibold text-[#424754] uppercase tracking-wider px-1 opacity-70">
                Email or Phone Number
              </label>
              <IdentifierInput
                onChange={setIdentifierState}
                disabled={loading}
                inputClassName={inputClass}
              />
            </div>

            {/* Terms */}
            <p className="text-[12px] font-semibold text-[#424754] leading-relaxed text-center opacity-70">
              By signing up, you agree to our{" "}
              <a href="#" className="text-[#0058be] hover:underline font-medium">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-[#0058be] hover:underline font-medium">Privacy Policy</a>.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !identifierState.valid || !fullName.trim()}
              className="w-full h-[56px] bg-[#0058be] text-white text-[20px] font-semibold rounded-xl flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-[#0058be]/20 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2 text-[16px]">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                <>
                  Sign Up
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-10 border-t border-white/40 flex flex-col items-center">
            <p className="text-[16px] text-[#424754]">
              Already have an account?{" "}
              <Link to="/" className="text-[#0058be] font-bold hover:text-[#004395] transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* System footer */}
        <footer className="mt-10 flex justify-between items-center px-4 opacity-60">
          <span className="text-[12px] text-[#424754]">Lectra v2.4.0</span>
          <div className="flex gap-10">
            <a href="#" className="text-[12px] text-[#424754] hover:text-[#0058be] transition-colors">Support</a>
            <a href="#" className="text-[12px] text-[#424754] hover:text-[#0058be] transition-colors">Status</a>
          </div>
        </footer>

      </main>
    </div>
  )
}

export default Register