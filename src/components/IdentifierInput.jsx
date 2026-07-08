import { useState } from "react"

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1",  label: "🇺🇸 +1"  },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+49", label: "🇩🇪 +49" },
]

// EMAIL_REGEX kept here so this component owns its own validity check
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Single field that behaves as phone or email depending on the first
 * character typed:
 *  - first char is a digit  -> phone mode, shows a changeable country-code badge,
 *                               input accepts digits only, capped at 10
 *  - first char is a letter -> email mode, plain text input, no badge
 *
 * Calls onChange({ identifier, valid, mode }) on every change so the
 * parent screen can drive its submit button / payload shape.
 */
function IdentifierInput({ onChange, disabled, inputClassName, placeholder }) {
  const [mode, setMode]               = useState(null) // null | "phone" | "email"
  const [countryCode, setCountryCode] = useState("+91")
  const [buffer, setBuffer]           = useState("")
  const [error, setError]             = useState("")

  const emitChange = (nextMode, nextBuffer, nextCountryCode = countryCode) => {
    let identifier = ""
    let valid = false

    if (nextMode === "phone") {
      identifier = nextCountryCode + nextBuffer
      valid = nextBuffer.length === 10
    } else if (nextMode === "email") {
      identifier = nextBuffer
      valid = EMAIL_REGEX.test(nextBuffer.trim())
    }

    onChange({ identifier, valid, mode: nextMode })
  }

  const handleChange = (e) => {
    const val = e.target.value

    if (val.length === 0) {
      setMode(null)
      setBuffer("")
      setError("")
      emitChange(null, "")
      return
    }

    const firstChar = val[0]

    if (/\d/.test(firstChar)) {
      const digits = val.replace(/\D/g, "")

      if (digits.length > 10) {
        setError("Phone number must be exactly 10 digits, excluding country code")
        const capped = digits.slice(0, 10)
        setMode("phone")
        setBuffer(capped)
        emitChange("phone", capped)
      } else {
        setError("")
        setMode("phone")
        setBuffer(digits)
        emitChange("phone", digits)
      }
    } else {
      setError("")
      setMode("email")
      setBuffer(val)
      emitChange("email", val)
    }
  }

  const handleCountryChange = (e) => {
    const cc = e.target.value
    setCountryCode(cc)
    emitChange("phone", buffer, cc)
  }

  return (
    <div className="space-y-1">
      <div className="flex gap-2">
        {mode === "phone" && (
          <div className="relative w-28 shrink-0">
            <select
              value={countryCode}
              onChange={handleCountryChange}
              disabled={disabled}
              className="w-full h-14 pl-3 pr-8 appearance-none bg-white border border-[#c2c6d6]/50 rounded-xl text-[15px] text-[#111c2d] focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] outline-none cursor-pointer transition-all"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-3.5 h-3.5 text-[#727785]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}

        <input
          type="text"
          inputMode={mode === "phone" ? "numeric" : "text"}
          placeholder={placeholder || "you@example.com or 9876543210"}
          value={buffer}
          onChange={handleChange}
          disabled={disabled}
          className={inputClassName}
        />
      </div>

      {error && <p className="text-[12px] text-[#ba1a1a] ml-1">{error}</p>}
    </div>
  )
}

export default IdentifierInput