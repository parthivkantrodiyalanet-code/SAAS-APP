import { Navigate } from 'react-router-dom';
import { useUserAuthStore } from '../store/userAuth';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  // ✅ Correct Zustand usage
  const {isAuthenticated} = useUserAuthStore();
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
 if (isAuthenticated === null || isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }
  return isAuthenticated == true ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
