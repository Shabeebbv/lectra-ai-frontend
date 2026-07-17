import { jwtDecode } from "jwt-decode"

export function useCurrentUser() {
  const token = localStorage.getItem("access")
  if (!token) return null

  try {
    const decoded = jwtDecode(token)
    return {
      id: decoded.user_id,
      role: decoded.role,
      fullName: decoded.full_name,
    }
  } catch {
    return null
  }
}