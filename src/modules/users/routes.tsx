import { RouteObject } from 'react-router-dom';
import UsersList from './list';
import UserDetails from './details';

const userRoutes: RouteObject[] = [
  {
    path: '/users',
    element: <UsersList />,
  },
  {
    path: '/users/details/:id',
    element: <UserDetails />,
  },
];

export default userRoutes;