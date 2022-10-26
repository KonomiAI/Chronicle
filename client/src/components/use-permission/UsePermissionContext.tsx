import React, { createContext, useContext, useMemo } from 'react';
import { useStore } from '../../store';
import { Features, PermissionDetail } from '../../types';

interface PermissionContextProps {
  permissions?: Record<string, PermissionDetail>;
  canWrite: boolean;
  feature?: Features;
  outOfContext: boolean;
}

interface PermissionProviderProps {
  feature: Features;
}

const PermissionContext = createContext<PermissionContextProps>({
  canWrite: true,
  outOfContext: true,
});

export const usePermission = () => useContext(PermissionContext);

const PermissionProvider: React.FC<PermissionProviderProps> = ({
  children,
  feature,
}) => {
  const { permissions } = useStore();

  const contextValue: PermissionContextProps = useMemo(
    () => ({
      permissions,
      canWrite: !feature || !!permissions[feature]?.write,
      feature,
      outOfContext: false,
    }),
    [permissions, feature],
  );
  return (
    <PermissionContext.Provider value={contextValue}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
