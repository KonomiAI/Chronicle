import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import NotAuthorizedPage from '../../pages/not-authorized/NotAuthorized';
import { checkIsLoggedIn } from '../../utils';

const DEFAULT_REDIRECT = '/login';

interface ProtectedRouteProps {
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
  children,
  redirect,
  isAllowed,
}) => {
  if (!checkIsLoggedIn()) {
    return <Navigate to={redirect || DEFAULT_REDIRECT} replace />;
  }

  if (!isAllowed) {
    return <NotAuthorizedPage />;
  }

  return children || <Outlet />;
};

ProtectedRoute.defaultProps = defaultProps;

export default ProtectedRoute;
