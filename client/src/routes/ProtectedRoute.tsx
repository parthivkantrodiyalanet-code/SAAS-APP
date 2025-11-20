import { Navigate } from 'react-router-dom';
import { useUserAuthStore } from '../store/userAuth';
import { useEffect, useState } from 'react';
import { useApiResponseStore } from '../store/apiResponce';
import Loading from '../components/Loading';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, setIsAuthenticated } = useUserAuthStore();
  const { getApiResponse } = useApiResponseStore();
  const [loading, setLoading] = useState(true); // state to control loading

  useEffect(() => {
    const checkToken = async () => {
      const res = await getApiResponse("/auth/token");
      if (res && res.authentication === true) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      // Show loading screen for 5 seconds
      setTimeout(() => setLoading(false),100);
    };

    checkToken();
  }, []);

  if (loading) {
    return <Loading />; // render your Loading component
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  return element; // render protected element
};

export default ProtectedRoute;
