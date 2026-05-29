import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Login from './components/auth/Login';
import Layout from './components/shared/Layout';
import SuperAdminDashboard from './components/dashboard/SuperAdminDashboard';
import SchoolAdminDashboard from './components/dashboard/SchoolAdminDashboard';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import ParentDashboard from './components/dashboard/ParentDashboard';
import Attendance from './components/modules/Attendance';
import Meals from './components/modules/Meals';
import Notices from './components/modules/Notices';
import Homework from './components/modules/Homework';
import Feedback from './components/modules/Feedback';
import Pickup from './components/modules/Pickup';
import BusStatus from './components/modules/BusStatus';
import Magazine from './components/modules/Magazine';
import Activities from './components/modules/Activities';
import Students from './components/modules/Students';
import Teachers from './components/modules/Teachers';
import Tenants from './components/modules/Tenants';

function DashboardRouter() {
  const { user } = useAuth();
  switch (user?.role) {
    case 'super_admin': return <SuperAdminDashboard />;
    case 'school_admin': return <SchoolAdminDashboard />;
    case 'teacher': return <TeacherDashboard />;
    case 'parent': return <ParentDashboard />;
    default: return <Navigate to="/" />;
  }
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/" />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
      <Route path="/meals" element={<ProtectedRoute><Meals /></ProtectedRoute>} />
      <Route path="/notices" element={<ProtectedRoute><Notices /></ProtectedRoute>} />
      <Route path="/homework" element={<ProtectedRoute><Homework /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
      <Route path="/pickup" element={<ProtectedRoute><Pickup /></ProtectedRoute>} />
      <Route path="/bus" element={<ProtectedRoute><BusStatus /></ProtectedRoute>} />
      <Route path="/magazine" element={<ProtectedRoute><Magazine /></ProtectedRoute>} />
      <Route path="/activities" element={<ProtectedRoute><Activities /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
      <Route path="/teachers" element={<ProtectedRoute><Teachers /></ProtectedRoute>} />
      <Route path="/tenants" element={<ProtectedRoute><Tenants /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
