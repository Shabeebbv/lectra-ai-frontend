import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios"

function ForgotPassword() {

  const navigate = useNavigate()

  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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
        error.response?.data?.message ||
        "Failed to send OTP"
      )

    } finally {

      setLoading(false)

    }

  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg"
          >
            {
              loading
                ? "Sending OTP..."
                : "Send OTP"
            }
          </button>

        </form>

      </div>

    </div>
  )
}

export default ForgotPassword