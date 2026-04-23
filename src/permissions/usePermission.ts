import { useMemo } from 'react';
import { usePermissionContext } from './PermissionContext';
import { hasAccess, hasModuleAccess } from './permissionUtils';

export const usePermission = () => {
  const { permissions, isLoaded } = usePermissionContext();

  // ✅ memoized helpers (important for performance)
  const can = useMemo(() => {
    return (module: string, action: string) =>
      hasAccess(permissions, module, action);
  }, [permissions]);

  const canAccess = useMemo(() => {
    return (module: string) =>
      hasModuleAccess(permissions, module);
  }, [permissions]);

  return {
    permissions,
    isLoaded,
    can,
    canAccess,
  };
};