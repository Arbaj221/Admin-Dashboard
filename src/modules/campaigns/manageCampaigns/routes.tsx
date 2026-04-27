import { RouteObject } from 'react-router-dom';
import CampaignsList from './list';
import CompaignDetails from './details';

const CampaignRoutes: RouteObject[] = [
    {
        path: '/campaigns',
        element: <CampaignsList />,
    },
    {
        path: '/campaigns/details/:id',
        element: <CompaignDetails />,
    },
];


export default CampaignRoutes