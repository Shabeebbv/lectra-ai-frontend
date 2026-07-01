import { jwtDecode } from "jwt-decode"
import api from "../api/axios"

// Checks if the stored access token is expired, and if so, refreshes it
// before returning. Uses the same `api` axios instance as the rest of the
// app (with its baseURL already configured) — NOT plain axios, which has
// no baseURL and would send the refresh request to whatever page is
// currently loaded (e.g. the Vite dev server) instead of the Django API.

export async function getValidAccessToken() {
  const access = localStorage.getItem("access")
  const refresh = localStorage.getItem("refresh")

  if (!access || !refresh) return null

  try {
    const decoded = jwtDecode(access)
    const isExpired = decoded.exp * 1000 < Date.now()

    if (!isExpired) return access

    const response = await api.post("/users/token/refresh/", { refresh })
    const newAccess = response.data.access

    localStorage.setItem("access", newAccess)
    return newAccess
  } catch {
    return null
  }
}