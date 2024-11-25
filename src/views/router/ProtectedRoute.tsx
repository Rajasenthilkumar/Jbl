import { useAuth } from 'hooks/useAuth';
import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: FC = () => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
