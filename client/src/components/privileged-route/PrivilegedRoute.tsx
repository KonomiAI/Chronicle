import React from 'react';
import { Outlet } from 'react-router-dom';

import NotAuthorizedPage from '../../pages/not-authorized/NotAuthorized';

import { useStore } from '../../store';
import { Features } from '../../types';
import PermissionProvider from '../use-permission/UsePermissionContext';

interface PrivelegedRouteProps {
  children?: React.ReactElement;
  feature: Features;
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

  return (
    <PermissionProvider feature={feature}>
      {children || <Outlet />}
    </PermissionProvider>
  );
};

PrivelegedRoute.defaultProps = defaultProps;

export default PrivelegedRoute;
