import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"

import Register        from "./pages/auth/Register"
import Login           from "./pages/auth/Login"
import VerifyOtp       from "./pages/auth/VerifyOtp"
import VerifyLoginOtp  from "./pages/auth/VerifyLoginOtp"
import Dashboard       from "./pages/Dashboard/Dashboard"
import ProtectedRoute  from "./routes/ProtectedRoute"
import LectureDetail   from "./pages/lectures/LectureDetail"
import LecturesList    from "./pages/lectures/Lectureslist"
import NotesList       from "./pages/notes/NotesList"
import NoteDetail      from "./pages/notes/NoteDetail"
import { LectureSocketProvider } from "./context/LectureSocketContext"

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
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/lectures/:id" element={<ProtectedRoute><LectureDetail /></ProtectedRoute>} />
        <Route path="/lectures" element={<ProtectedRoute><LecturesList /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><NotesList /></ProtectedRoute>} />
        <Route path="/notes/:id" element={<ProtectedRoute><NoteDetail /></ProtectedRoute>} />
      </Routes>
      </LectureSocketProvider>
    </BrowserRouter>
  )
}

export default App