import { RouteObject } from 'react-router-dom';
import VendorList from './list';
import VendorDetails from './details';

const VendorRoutes: RouteObject[] = [
    {
        path: '/vendors',
        element: <VendorList />,
    },
    {
        path: '/vendors/details/:id',
        element: <VendorDetails />,
    }
];


export default VendorRoutes