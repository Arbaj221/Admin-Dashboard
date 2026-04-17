import { RouteObject } from 'react-router-dom';
import RolesList from './list';

const rolesRoutes: RouteObject[] = [
  {
    path: '/admin/roles',
    element: <RolesList />,
  }
];

export default rolesRoutes;