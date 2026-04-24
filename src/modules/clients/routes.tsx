import { RouteObject } from 'react-router-dom';
import ClientsList from './list';
import ClientDetails from './details';

const clientRoutes: RouteObject[] = [
    {
        path: '/clients',
        element: <ClientsList />,
    },
    {
        path: '/clients/details/:id',
        element: <ClientDetails />,
    }
];


export default clientRoutes