import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import AnalysisPage from './pages/AnalysisPage'
import AdvisorPage from './pages/AdvisorPage'
import AppLayout from './layouts/AppLayout'

function App () {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/advisor" element={<AdvisorPage />} />
      </Routes>
    </AppLayout>
  )
}

export default App
