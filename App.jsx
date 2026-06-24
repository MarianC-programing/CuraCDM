import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'

import LoginPage              from './pages/auth/LoginPage'
import DashboardPage          from './pages/dashboard/DashboardPage'
import ParticipantsPage       from './pages/participants/ParticpantsPage'
import ParticipantDetailPage  from './pages/participants/ParticipantDetailPage'
import ExperimentsPage        from './pages/experiments/ExperimentsPage'
import ExperimentDetailPage   from './pages/experiments/ExperimentDetailPage'
import TasksPage              from './pages/tasks/TasksPage'
import LibraryPage            from './pages/library/LibraryPage'
import TeamPage               from './pages/team/TeamPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,   // 2 min
      retry: 1,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard"          element={<DashboardPage />} />
              <Route path="participants"       element={<ParticipantsPage />} />
              <Route path="participants/:id"   element={<ParticipantDetailPage />} />
              <Route path="experiments"        element={<ExperimentsPage />} />
              <Route path="experiments/:id"    element={<ExperimentDetailPage />} />
              <Route path="tasks"              element={<TasksPage />} />
              <Route path="library"            element={<LibraryPage />} />
              <Route path="team"               element={<TeamPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}
