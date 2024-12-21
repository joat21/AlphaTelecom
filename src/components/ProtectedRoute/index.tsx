import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import { UserRole } from '@entities/model';
import { ROUTES } from '@constants/routes';
import { User } from '@services/authApi';
import { selectAuth } from '@store/Auth/selectors';

interface ProtectedRouteProps {
  requiredRole: UserRole;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { activeUserId, tokens } = useSelector(selectAuth);

  if (!activeUserId) {
    return <Navigate to={ROUTES.AUTH.CLIENT} replace />;
  }

  const { role } = jwtDecode<User>(tokens[activeUserId]);

  if (role !== requiredRole) {
    return 'no access';
  }

  return <Outlet />;
};

export default ProtectedRoute;
