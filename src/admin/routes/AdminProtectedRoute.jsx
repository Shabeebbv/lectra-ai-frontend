import { Navigate } from "react-router-dom"
import { useCurrentUser } from "../../hooks/useCurrentUser"

function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("access")

  if (!token) {
    return <Navigate to="/login" />
  }

  const currentUser = useCurrentUser()
  const isAdmin = currentUser?.role === "admin" || currentUser?.role === "super_admin"

  if (!isAdmin) {
    return <Navigate to="/dashboard" />
  }

  return children
}

export default AdminProtectedRoute
