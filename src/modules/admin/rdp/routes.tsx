import { RouteObject } from 'react-router-dom';
import RDPList from './list';

const rdpRoutes: RouteObject[] = [
    {
        path: '/admin/rdp',
        element: <RDPList />,
    }
];

export default rdpRoutes;