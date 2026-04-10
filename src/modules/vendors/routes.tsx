import { RouteObject } from 'react-router-dom';
import EditVendor from './edit';
import CreateVendor from './create';
import VendorList from './list';

const VendorRoutes: RouteObject[] = [
    {
        path: '/vendors',
        element: <VendorList />,
    },
    {
        path: '/vendors/create',
        element: <CreateVendor />,
    },
    {
        path: '/vendors/edit/:id',
        element: <EditVendor />,
    }
];


export default VendorRoutes