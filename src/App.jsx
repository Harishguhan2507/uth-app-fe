import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import FindTalent from './pages/FindTalent';
import EmployeeProfile from './pages/EmployeeProfile';
import AIFeatures from './pages/AIFeatures';
import MyProjects from './pages/MyProjects';
import MyProfile from './pages/MyProfile';
import Directory from './pages/Directory';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/find-talent" element={<FindTalent />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/profile/:id" element={<EmployeeProfile />} />
          <Route path="/ai-features" element={<AIFeatures />} />
          <Route path="/my-projects" element={<MyProjects />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
