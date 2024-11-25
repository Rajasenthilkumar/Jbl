import { useAuth } from 'hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { authenticated, mode } = useAuth();
  if (authenticated && mode === 'Host') {
    return <Navigate to="/dashboard" replace />;
  }
  if (authenticated && mode === 'Guest') {
    return <Navigate to="/guest-dashboard" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
