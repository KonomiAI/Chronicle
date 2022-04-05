import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NotAuthorizedPage from '../../pages/not-authorized/NotAuthorized';

const DEFAULT_REDIRECT = '/login';

interface ProtectedRouteProps {
  // TODO: Change this to the official user object later
  user: boolean;
  redirect?: string;
  children?: React.ReactElement;
  isAllowed?: boolean;
}

const defaultProps = {
  children: undefined,
  redirect: DEFAULT_REDIRECT,
  isAllowed: true,
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  children,
  redirect,
  isAllowed,
}) => {
  if (!user) {
    // TODO: Remove all identities
    return <Navigate to={redirect || DEFAULT_REDIRECT} replace />;
  }

  if (!isAllowed) {
    return <NotAuthorizedPage />;
  }

  return children || <Outlet />;
};

ProtectedRoute.defaultProps = defaultProps;

export default ProtectedRoute;
