import { RouteObject } from 'react-router-dom';
import ModulePermissionsList from './list';

const modulePermissionsRoutes: RouteObject[] = [
    {
        path: '/admin/module-permissions',
        element: <ModulePermissionsList />,
    }
];

export default modulePermissionsRoutes;