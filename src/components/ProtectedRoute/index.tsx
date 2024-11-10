import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { UserRole } from '../../entities/model';
import { ROUTES } from '../../constants/routes';

interface ProtectedRouteProps {
  requiredRole: UserRole;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!localStorage.getItem('token')) {
    return <Navigate to={ROUTES.AUTH.CLIENT} replace />;
  }

  if (user?.role !== requiredRole) {
    return 'no access';
  }

  return <Outlet />;
};

export default ProtectedRoute;
