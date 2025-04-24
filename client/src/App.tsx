import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { TaskPage } from './pages/TaskPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { DashboardPage } from './pages/DashboardPage';
import { useAuthStore } from './hooks/useAuthStore';



export function App() {
  const token = useAuthStore(state => state.session?.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!token ? <LoginPage /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/register"
          element={!token ? <RegistrationPage /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/tasks"
          element={token ? <TaskPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard"
          element={token ? <DashboardPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? '/dashboard' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}
