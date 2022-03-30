import React from 'react';
import { Outlet } from 'react-router-dom';
import NotAuthorizedPage from '../../pages/not-authorized/NotAuthorized';

interface ProtectedRouteProps {
  children?: React.ReactElement;
  isAllowed: boolean;
}

const defaultProps = {
  children: undefined,
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAllowed,
}) => {
  if (!isAllowed) {
    return <NotAuthorizedPage />;
  }

  return children || <Outlet />;
};

ProtectedRoute.defaultProps = defaultProps;

export default ProtectedRoute;
