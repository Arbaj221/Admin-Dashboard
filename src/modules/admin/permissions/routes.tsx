import { RouteObject } from 'react-router-dom';
import PermissionsList from './list';

const permissionsRoutes: RouteObject[] = [
    {
        path: '/admin/permissions',
        element: <PermissionsList />,
    }
];

export default permissionsRoutes;