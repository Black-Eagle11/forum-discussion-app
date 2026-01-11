import { Routes, Route, Navigate } from 'react-router-dom';

import ThreadsPage from '../pages/ThreadsPage';
import ThreadDetailPage from '../pages/ThreadDetailPage';
import AddThreadPage from '../pages/AddThreadPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

import ProtectedRoute from '../components/common/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<ThreadsPage />} />
      <Route path="/threads/:id" element={<ThreadDetailPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected route */}
      <Route
        path="/new"
        element={(
          <ProtectedRoute>
            <AddThreadPage />
          </ProtectedRoute>
        )}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
