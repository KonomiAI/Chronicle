import { Alert } from '@mui/material';
import React, { createContext, useContext, useMemo } from 'react';
import { useStore } from '../../store';
import { Features, PermissionDetail } from '../../types';
import Spacer from '../spacer/Spacer';

interface PermissionContextProps {
  permissions?: Record<string, PermissionDetail>;
  canWrite?: boolean;
  feature?: Features;
}

interface PermissionProviderProps {
  feature: Features;
}

const PermissionContext = createContext<PermissionContextProps>({});

export const usePermission = () => useContext(PermissionContext);

const PermissionProvider: React.FC<PermissionProviderProps> = ({
  children,
  feature,
}) => {
  const { permissions } = useStore();

  const contextValue: PermissionContextProps = useMemo(
    () => ({ permissions, canWrite: !!permissions[feature]?.write, feature }),
    [permissions],
  );
  return (
    <PermissionContext.Provider value={contextValue}>
      {!permissions[feature]?.read && (
        <>
          <Alert
            severity="error"
            title={`Sorry, you do not have access to ${feature}.`}
          >
            If you believe this is an error, please contact your administrator.
          </Alert>
          <Spacer size="lg" />
        </>
      )}
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
