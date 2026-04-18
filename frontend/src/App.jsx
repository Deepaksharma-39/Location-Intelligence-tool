import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import AnalysisPage from './pages/AnalysisPage'
import AdvisorPage from './pages/AdvisorPage'
import AppLayout from './layouts/AppLayout'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import MapIntelligencePage from './pages/MapIntelligencePage'

function AppShell () {
  return (
    <ProtectedRoute>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/advisor" element={<AdvisorPage />} />
          <Route path="/map-intelligence" element={<MapIntelligencePage />} />
        </Routes>
      </AppLayout>
    </ProtectedRoute>
  )
}

function App () {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<AppShell />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
