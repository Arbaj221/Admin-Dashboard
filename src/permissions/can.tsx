import { ReactNode, useMemo } from 'react';
import { usePermission } from './usePermission';

interface Props {
  module: string;
  action?: string;
  fallback?: ReactNode;
  children: ReactNode;
}

const Can = ({ module, action = 'view', fallback = null, children }: Props) => {
  const { can, canAccess, isLoaded } = usePermission();

  const allowed = useMemo(() => {
    if (!isLoaded) return false;

    // If action provided → check action
    if (action) {
      return can(module, action);
    }

    // Else → module-level access
    return canAccess(module);
  }, [module, action, can, canAccess, isLoaded]);

  if (!allowed) return <>{fallback}</>;

  return <>{children}</>;
};

export default Can;