import { RouteObject } from 'react-router-dom';
import UserDepartmentList from './list';

const userDepartmentRoutes: RouteObject[] = [
    {
        path: '/admin/userdepartment',
        element: <UserDepartmentList />,
    }
];

export default userDepartmentRoutes;