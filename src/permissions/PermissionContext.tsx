import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PermissionMap } from './permissions.types';
import { normalizePermissions } from './permissionUtils';

interface PermissionContextType {
    permissions: PermissionMap;
    isLoaded: boolean;
    loadPermissions: (data: PermissionMap) => void;
}

const PermissionContext = createContext<PermissionContextType | null>(null);

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
    const [permissions, setPermissions] = useState<PermissionMap>({});
    const [isLoaded, setIsLoaded] = useState(false);

    const loadPermissions = (data: PermissionMap) => {
        const normalized = normalizePermissions(data);
        setPermissions(normalized);
        setIsLoaded(true);
        localStorage.setItem('permissions', JSON.stringify(normalized));
    };

    useEffect(() => {
        const stored = localStorage.getItem('permissions');

        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setPermissions(parsed);
                setIsLoaded(true);
            } catch {
                localStorage.removeItem('permissions');
            }
        } else {
            setIsLoaded(true); // avoid blocking UI forever
        }
    }, []);

    return (
        <PermissionContext.Provider
            value={{
                permissions,
                isLoaded,
                loadPermissions,
            }}
        >
            {children}
        </PermissionContext.Provider>
    );
};

// ✅ internal hook (safe access)
export const usePermissionContext = () => {
    const context = useContext(PermissionContext);

    if (!context) {
        throw new Error('usePermissionContext must be used within PermissionProvider');
    }

    return context;
};