import { RouteObject } from 'react-router-dom';
import UsersList from './UsersList';
import UserDetails from './details';
import CreateUser from './create';
import EditUser from './edit';

const userRoutes: RouteObject[] = [
  {
    path: '/users',
    element: <UsersList />,
  },
   {
    path: '/users/create',
    element: <CreateUser />,
  },
  {
    path: '/users/edit/:id',
    element: <EditUser />,
  },
  {
    path: '/users/details',
    element: <UserDetails />,
  },
];

export default userRoutes;