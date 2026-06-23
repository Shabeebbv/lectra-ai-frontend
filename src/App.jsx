import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import VerifyOtp from "./pages/auth/VerifyOtp"
import Dashboard from "./pages/Dashboard/Dashboard"
import ProtectedRoute from "./routes/ProtectedRoute"
import ForgotPassword from "./pages/auth/ForgotPassword"
import LectureDetail from "./pages/lectures/LectureDetail"
import LecturesList from "./pages/lectures/Lectureslist"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/dashboard"element={
        <ProtectedRoute>
         <Dashboard />
        </ProtectedRoute>
        }
      /><Route
  path="/lectures/:id"
  element={
    <ProtectedRoute>
      <LectureDetail />
    </ProtectedRoute>
  }
/>
<Route
  path="/lectures"
  element={
    <ProtectedRoute>
      <LecturesList />
    </ProtectedRoute>
  }
/>  
      </Routes>
    </BrowserRouter>
  )
}

export default App