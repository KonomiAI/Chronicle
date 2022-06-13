import React from 'react';
import { Outlet } from 'react-router-dom';

import NotAuthorizedPage from '../../pages/not-authorized/NotAuthorized';

import { useStore } from '../../store';

interface PrivelegedRouteProps {
  children?: React.ReactElement;
  feature: string;
}

const defaultProps = {
  children: undefined,
};

const PrivelegedRoute: React.FC<PrivelegedRouteProps> = ({
  children,
  feature,
}) => {
  const { permissions, user } = useStore();

  if (!(user?.isSuperUser || permissions[feature]?.read)) {
    return <NotAuthorizedPage />;
  }

  return children || <Outlet />;
};

PrivelegedRoute.defaultProps = defaultProps;

export default PrivelegedRoute;
