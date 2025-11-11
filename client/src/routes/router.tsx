import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Profile from '../pages/Profile';
import Projects from '../pages/Projects';
import Settings from '../pages/Settings';
import Tasks from '../pages/Tasks';
import Workspace from '../pages/Workspace' ;
import Register from '../pages/Register';
import ProtectedRoute from '../routes/ProtectedRoute';

const router = createBrowserRouter([
  // Public routes
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  // Private routes
  { path: '/', element: <ProtectedRoute element={<Dashboard />} /> },
  { path: '/logout', element: <ProtectedRoute element={<Logout />} /> },
  { path: '/profile', element: <ProtectedRoute element={<Profile />} /> },
  { path: '/projects', element: <ProtectedRoute element={<Projects />} /> },
  { path: '/tasks', element: <ProtectedRoute element={<Tasks />} /> },
  { path: '/workspace', element: <ProtectedRoute element={<Workspace />} /> },
  { path: '/settings', element: <ProtectedRoute element={<Settings />} /> },

  // Fallback redirect
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;
