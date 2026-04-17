import { RouteObject } from 'react-router-dom';
import UserPermissionList from './list';

const userPermissionRoutes: RouteObject[] = [
    {
        path: '/admin/userpermission',
        element: <UserPermissionList />,
    }
];

export default userPermissionRoutes;