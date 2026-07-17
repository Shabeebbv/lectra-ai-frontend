import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"

import Register        from "./pages/auth/Register"
import Login           from "./pages/auth/Login"
import VerifyOtp       from "./pages/auth/VerifyOtp"
import VerifyLoginOtp  from "./pages/auth/VerifyLoginOtp"
import VerifyMfa        from "./pages/auth/VerifyMfa"
import Dashboard       from "./pages/Dashboard/Dashboard"
import ProtectedRoute  from "./routes/ProtectedRoute"
import LectureDetail   from "./pages/lectures/LectureDetail"
import LecturesList    from "./pages/lectures/Lectureslist"
import NotesList       from "./pages/notes/NotesList"
import NoteDetail      from "./pages/notes/NoteDetail"
import { LectureSocketProvider } from "./context/LectureSocketContext"
import TutorLecturePicker from "./pages/tutor/TutorLecturePicker"
import TutorChat from "./pages/tutor/TutorChat"
import Timeline from "./pages/lectures/Timeline"
import TimelineList from "./pages/lectures/TimelineList"

import AdminProtectedRoute from "./admin/routes/AdminProtectedRoute"
import AdminLayout         from "./admin/layouts/AdminLayout"
import AdminDashboard      from "./admin/pages/Dashboard"
import Users               from "./admin/pages/Users"
import DeletedUsers        from "./admin/pages/DeletedUsers"
import Lectures            from "./admin/pages/Lectures"
import Analytics           from "./admin/pages/Analytics"
import MfaSetup            from "./admin/pages/MfaSetup"

function App() {
  return (
    <BrowserRouter>
      <LectureSocketProvider>
        <Toaster
          position="top-right"
          richColors
          expand={false}
          duration={3000}
        />
        <Routes>
          <Route path="/register"         element={<Register />} />
          <Route path="/login"            element={<Login />} />
          <Route path="/verify-otp"       element={<VerifyOtp />} />
          <Route path="/verify-login-otp" element={<VerifyLoginOtp />} />
          <Route path="/verify-mfa"       element={<VerifyMfa />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/lectures/:id" element={<ProtectedRoute><LectureDetail /></ProtectedRoute>} />
          <Route path="/lectures" element={<ProtectedRoute><LecturesList /></ProtectedRoute>} />
          <Route path="/notes" element={<ProtectedRoute><NotesList /></ProtectedRoute>} />
          <Route path="/notes/:id" element={<ProtectedRoute><NoteDetail /></ProtectedRoute>} />
          <Route path="/tutor" element={<ProtectedRoute><TutorLecturePicker /></ProtectedRoute>} />
          <Route path="/tutor/:id" element={<ProtectedRoute><TutorChat /></ProtectedRoute>} />
          <Route path="/timeline" element={<ProtectedRoute><TimelineList /></ProtectedRoute>} />
          <Route path="/timeline/:id" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />

          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/deleted" element={<DeletedUsers />} />
            <Route path="lectures" element={<Lectures />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="security" element={<MfaSetup />} />
          </Route>

        </Routes>
      </LectureSocketProvider>
    </BrowserRouter>
  )
}

export default App