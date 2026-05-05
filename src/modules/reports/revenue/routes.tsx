import { RouteObject } from 'react-router-dom';
import RevenueList from './list';

const revnueRoutes: RouteObject[] = [
    {
        path: '/reports/revenue',
        element: <RevenueList />,
    },
];


export default revnueRoutes