import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Welcome from './components/welcome/Welcome'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Profile from './components/profile/Profile'
import VerifyEmail from './components/profile/VerifyEmail'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/complete-profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
