import api from "../api/axios"

export const mfaService = {
  setup: () => api.post("/users/mfa/setup/"),
  verifySetup: (code) => api.post("/users/mfa/verify-setup/", { code }),
  disable: () => api.post("/users/mfa/disable/"),
  status: () => api.get("/users/mfa/status/"),
  verifyLogin: (identifier, code) => api.post("/users/verify-mfa-otp/", { identifier, code }),
}