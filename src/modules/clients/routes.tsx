import { RouteObject } from 'react-router-dom';
import ClientsList from './ClientsList';
import CreateClient from './CreateClient';

const clientRoutes: RouteObject[] = [
    {
        path: '/clients',
        element: <ClientsList />,
    },
    {
        path: '/clients/create',
        element: <CreateClient />,
    },
    {
        path: '/clients/edit/:id',
        element: <CreateClient />,
    }
];


export default clientRoutes