import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'

import LoginPage           from './pages/auth/LoginPage'
import DashboardPage       from './pages/dashboard/DashboardPage'
import ParticipantsPage    from './pages/participants/ParticipantsPage'
import ParticipantDetailPage from './pages/participants/ParticipantDetailPage'
import ExperimentsPage     from './pages/experiments/ExperimentsPage'
import ExperimentDetailPage from './pages/experiments/ExperimentDetailPage'
import TasksPage           from './pages/tasks/TasksPage'
import LibraryPage         from './pages/library/LibraryPage'
import TeamPage            from './pages/team/TeamPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Pública */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protegidas — requieren login */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard"                element={<DashboardPage />} />
            <Route path="participants"             element={<ParticipantsPage />} />
            <Route path="participants/:id"         element={<ParticipantDetailPage />} />
            <Route path="experiments"              element={<ExperimentsPage />} />
            <Route path="experiments/:id"          element={<ExperimentDetailPage />} />
            <Route path="tasks"                    element={<TasksPage />} />
            <Route path="library"                  element={<LibraryPage />} />
            <Route path="team"                     element={<TeamPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}