import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../../api/axios"

function VerifyOtp() {

  const location = useLocation()
  const navigate = useNavigate()

  const phone_number = location.state?.phone_number

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)
      setError("")

      const response = await api.post(
        "/users/verify-otp/",
        {
          phone_number,
          otp,
        }
      )

      console.log(response.data)

      alert("OTP verified successfully")

      navigate("/login")

    } catch (error) {

      console.log(error.response?.data)

      setError(
        error.response?.data?.message ||
        "Invalid OTP"
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
            Verify your account
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-semibold text-center mb-3">
            OTP Verification
          </h2>

          <p className="text-center text-slate-500 mb-6">
            OTP sent to
            <br />
            <span className="font-medium text-slate-700">
              {phone_number}
            </span>
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="
                w-full
                text-center
                text-2xl
                tracking-[10px]
                border
                rounded-lg
                py-4
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                py-3
                rounded-lg
                font-medium
                transition
                disabled:opacity-50
              "
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default VerifyOtp