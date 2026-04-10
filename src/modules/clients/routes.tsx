import { RouteObject } from 'react-router-dom';
import ClientsList from './ClientsList';
import CreateClient from './CreateClient';
import EditClient from './EditClient';

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
        element: <EditClient />,
    }
];


export default clientRoutes