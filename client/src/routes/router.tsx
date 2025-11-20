import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Profile from '../pages/Profile';
import Projects from '../pages/Projects';
import Settings from '../pages/Settings';
import Tasks from '../pages/Tasks';
import Workspace from '../pages/Workspace';
import Register from '../pages/Register';
import ProtectedRoute from '../routes/ProtectedRoute';

const router = createBrowserRouter([
  // Public
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  // Private + Dashboard layout
  {
    path: '/',
    element: <ProtectedRoute element={<Dashboard />} />,
    children: [
      { index: true, element: <Navigate to="/projects" replace /> },
      { path: 'projects', element: <Projects /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'workspace', element: <Workspace /> }, 
      { path: 'settings', element: <Settings /> },
      { path: 'profile', element: <Profile /> },
      { path: 'logout', element: <Logout /> },
    ],
  },

  // Fallback
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;