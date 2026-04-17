import { RouteObject } from 'react-router-dom';
import DepartmentsList from './list';

const departmentsRoutes: RouteObject[] = [
    {
        path: '/admin/departments',
        element: <DepartmentsList />,
    }
];

export default departmentsRoutes;