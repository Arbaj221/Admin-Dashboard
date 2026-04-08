import { RouteObject } from 'react-router-dom';
import ClientsList from './ClientsList';

const clientRoutes: RouteObject[] = [
    {
        path: '/clients',
        element: <ClientsList />,
    }
];


export default clientRoutes