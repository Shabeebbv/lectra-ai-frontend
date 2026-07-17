import { useState, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { toast } from "sonner"
import { mfaService } from "../../services/mfaService"

export default function MfaSetup() {
  const [status, setStatus] = useState(null)
  const [setupData, setSetupData] = useState(null)
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchStatus = async () => {
    try {
      const res = await mfaService.status()
      setStatus(res.data.data.enabled)
    } catch {
      toast.error("Failed to load MFA status.")
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  const startSetup = async () => {
    try {
      const res = await mfaService.setup()
      setSetupData(res.data.data)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to start MFA setup.")
    }
  }

  const confirmSetup = async (e) => {
    e.preventDefault()
    if (code.length !== 6) return
    setLoading(true)
    try {
      await mfaService.verifySetup(code)
      toast.success("MFA enabled successfully.")
      setSetupData(null)
      setCode("")
      fetchStatus()
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid code.")
    } finally {
      setLoading(false)
    }
  }

  const handleDisable = async () => {
    try {
      await mfaService.disable()
      toast.success("MFA disabled.")
      fetchStatus()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to disable MFA.")
    }
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-xl font-semibold text-slate-900 mb-1">Two-Factor Authentication</h1>
      <p className="text-sm text-slate-500 mb-6">
        Require an authenticator app code in addition to OTP when logging in.
      </p>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        {status === null && <p className="text-sm text-slate-400">Loading…</p>}

        {status === true && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20">
                Enabled
              </span>
              <span className="text-sm text-slate-600">MFA is protecting your account</span>
            </div>
            <button
              onClick={handleDisable}
              className="text-sm font-medium text-red-500 hover:text-red-700"
            >
              Disable
            </button>
          </div>
        )}

        {status === false && !setupData && (
          <div>
            <p className="text-sm text-slate-600 mb-4">
              MFA is not enabled. Set it up with any authenticator app (Google Authenticator, Authy, 1Password).
            </p>
            <button
              onClick={startSetup}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Set up MFA
            </button>
          </div>
        )}

        {setupData && (
          <div>
            <p className="text-sm text-slate-600 mb-4">
              Scan this QR code with your authenticator app, then enter the 6-digit code it generates.
            </p>

            <div className="flex justify-center mb-4 p-4 bg-slate-50 rounded-xl">
              <QRCodeSVG value={setupData.provisioning_uri} size={180} />
            </div>

            <p className="text-xs text-slate-400 text-center mb-4 break-all">
              Can't scan? Enter manually: <span className="font-mono">{setupData.secret}</span>
            </p>

            <form onSubmit={confirmSetup} className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="6-digit code"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
              >
                Confirm
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}