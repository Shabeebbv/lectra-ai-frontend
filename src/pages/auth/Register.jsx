import { useState } from "react"
import api from "../../api/axios"
import { useNavigate, Link } from "react-router-dom"

// ── Password strength helpers ────────────────────────────────────────────────
function getPasswordScore(pwd) {
  return [
    pwd.length >= 8,
    /[A-Z]/.test(pwd),
    /[0-9]/.test(pwd),
    /[^A-Za-z0-9]/.test(pwd),
  ]
}

function strengthMeta(score, hasInput) {
  if (!hasInput) return { label: "", color: "", width: "0%" }
  if (score < 2) return { label: "Weak",   color: "#ba1a1a",  width: "25%" }
  if (score < 4) return { label: "Medium", color: "#f59e0b",  width: "60%" }
  return              { label: "Strong",  color: "#22c55e",  width: "100%" }
}

// ── Country codes ────────────────────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: "+1",  label: "+1 US"  },
  { code: "+44", label: "+44 UK" },
  { code: "+91", label: "+91 IN" },
  { code: "+61", label: "+61 AU" },
]

// ── Inline styles (design-system tokens from the HTML) ───────────────────────
const styles = {
  // colours
  primary:       "#4648d4",
  primaryHover:  "#6063ee",
  secondary:     "#8127cf",
  surface:       "#f8f9ff",
  onSurface:     "#0b1c30",
  onSurfaceVar:  "#464554",
  outline:       "#767586",
  error:         "#ba1a1a",

  // reusable class-blocks (Tailwind utility strings)
  inputBase:
    "w-full py-3 bg-white/50 border border-[#767586]/30 rounded-lg " +
    "focus:ring-2 focus:ring-[#4648d4]/20 focus:border-[#4648d4] " +
    "transition-all outline-none text-sm text-[#0b1c30] placeholder:text-[#767586]",
}

// ── Bolt / Electric-bolt icon (Material Symbols SVG stand-in) ────────────────
function BoltIcon({ size = 24, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M440-240 280-480h160v-240l200 280H480v200Z" />
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="20" height="20" fill="currentColor">
      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="20" height="20" fill="currentColor">
      <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/>
    </svg>
  )
}

function EyeIcon({ off = false }) {
  return off ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="20" height="20" fill="currentColor">
      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t36.5-4q75 0 127.5 52.5T660-500q0 19-4 36.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Z"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="20" height="20" fill="currentColor">
      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="16" height="16" fill="currentColor">
      <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
    </svg>
  )
}

function CancelIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="16" height="16" fill="currentColor">
      <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="18" height="18" fill="currentColor">
      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
    </svg>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    password: "",
  })
  const [countryCode, setCountryCode] = useState("+91")
  const [phoneLocal, setPhoneLocal] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  // password validation
  const checks = getPasswordScore(formData.password)
  const passedCount = checks.filter(Boolean).length
  const { label: strengthLabel, color: strengthColor, width: strengthWidth } =
    strengthMeta(passedCount, formData.password.length > 0)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhoneLocal = (e) => {
    setPhoneLocal(e.target.value)
    setFormData({ ...formData, phone_number: countryCode + e.target.value })
  }

  const handleCountryCode = (e) => {
    setCountryCode(e.target.value)
    setFormData({ ...formData, phone_number: e.target.value + phoneLocal })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agreed) { alert("Please agree to the Terms of Service and Privacy Policy."); return }

    try {
      setLoading(true)
      const response = await api.post("/users/register/", formData)
      console.log(response.data)
      navigate("/verify-otp", { state: { phone_number: formData.phone_number } })
    } catch (error) {
      console.log(error.response?.data)
      alert(error.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{ background: "#f8f9ff", color: "#0b1c30", fontFamily: "Inter, sans-serif" }}
    >
      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 md:px-10 h-16 border-b border-white/20 shadow-sm"
        style={{ background: "rgba(248,249,255,0.70)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-2">
          <BoltIcon size={28} className="text-[#4648d4]" />
          <span className="text-xl font-bold tracking-tight text-[#4648d4]">Lectra AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Platform", "Solutions", "Pricing"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-[#464554] hover:text-[#4648d4] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
          <a href="#" className="text-sm font-semibold text-[#4648d4]">Sign In</a>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-16 relative">
        {/* Background orbs */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "rgba(70,72,212,0.10)", filter: "blur(100px)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "rgba(129,39,207,0.10)", filter: "blur(80px)" }}
        />

        <div className="w-full max-w-[480px] z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: "linear-gradient(135deg,#4648d4 0%,#8127cf 100%)" }}
              >
                <BoltIcon size={28} className="text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-[#0b1c30] mb-1">Create Your Account</h1>
            <p className="text-sm text-[#464554]">Join Lectra AI and start your learning journey</p>
          </div>

          {/* Form card (glass) */}
          <div
            className="rounded-2xl py-8 px-6 space-y-5"
            style={{
              background: "rgba(255,255,255,0.70)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-medium tracking-wide text-[#464554] px-1">
                  Full Name
                </label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#767586] group-focus-within:text-[#4648d4] transition-colors">
                    <PersonIcon />
                  </span>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className={`${styles.inputBase} pl-10 pr-4`}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="block text-xs font-medium tracking-wide text-[#464554] px-1">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  {/* Country selector */}
                  <div className="relative w-28 shrink-0">
                    <select
                      value={countryCode}
                      onChange={handleCountryCode}
                      className="w-full pl-3 pr-7 py-3 appearance-none bg-white/50 border border-[#767586]/30 rounded-lg focus:ring-2 focus:ring-[#4648d4]/20 focus:border-[#4648d4] transition-all outline-none text-sm text-[#0b1c30]"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#767586] pointer-events-none">
                      <ChevronDownIcon />
                    </span>
                  </div>
                  {/* Local number */}
                  <input
                    type="tel"
                    placeholder="000-000-0000"
                    value={phoneLocal}
                    onChange={handlePhoneLocal}
                    required
                    className={`${styles.inputBase} flex-grow px-4`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-xs font-medium tracking-wide text-[#464554] px-1">
                  Password
                </label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#767586] group-focus-within:text-[#4648d4] transition-colors">
                    <LockIcon />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`${styles.inputBase} pl-10 pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#767586] hover:text-[#0b1c30] transition-colors"
                  >
                    <EyeIcon off={showPassword} />
                  </button>
                </div>

                {/* Strength meter */}
                <div className="px-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#464554]">
                      Password Strength
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: strengthColor || "#464554" }}
                    >
                      {strengthLabel || "—"}
                    </span>
                  </div>
                  <div className="w-full bg-[#767586]/20 rounded-full h-1">
                    <div
                      className="h-1 rounded-full transition-all duration-300"
                      style={{ width: strengthWidth, background: strengthColor }}
                    />
                  </div>
                </div>

                {/* Validation checklist */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 px-1 pt-1">
                  {[
                    { label: "8+ characters", ok: checks[0] },
                    { label: "Uppercase",     ok: checks[1] },
                    { label: "Number",        ok: checks[2] },
                    { label: "Special char",  ok: checks[3] },
                  ].map(({ label, ok }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <span style={{ color: ok ? "#22c55e" : "#ba1a1a" }}>
                        {ok ? <CheckIcon /> : <CancelIcon />}
                      </span>
                      <span className="text-[12px] text-[#464554]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 px-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-[#767586]/30 accent-[#4648d4] cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-[#464554] leading-snug cursor-pointer">
                  I agree to the{" "}
                  <a href="#" className="text-[#4648d4] hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-[#4648d4] hover:underline">Privacy Policy</a>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: loading
                    ? "#6063ee"
                    : "linear-gradient(135deg,#4648d4 0%,#8127cf 100%)",
                  boxShadow: "0 4px 20px rgba(70,72,212,0.25)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Sign in redirect */}
              <p className="text-center text-sm text-[#464554]">
                Already have an account?{" "}
                <Link to="/login" className="text-[#4648d4] font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full py-8 flex flex-col md:flex-row justify-between items-center px-5 md:px-10 border-t border-[#767586]/10">
        <div className="text-xs text-[#464554]/70 mb-4 md:mb-0">
          © 2024 Lectra AI. Empowering intelligence.
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {["Privacy Policy", "Terms of Service", "Cookie Settings", "Help Center"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs text-[#464554]/70 hover:text-[#4648d4] transition-all"
            >
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default Register