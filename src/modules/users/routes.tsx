import { RouteObject } from 'react-router-dom';
import UsersList from './UsersList';
import UserDetails from './UserDetails';

const userRoutes: RouteObject[] = [
  {
    path: '/users',
    element: <UsersList />,
  },
  {
    path: '/users/details',
    element: <UserDetails />,
  },
];

export default userRoutes;