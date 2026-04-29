import { RouteObject } from 'react-router-dom';
import CampaignsList from './list';
import CompaignDetails from './details';
import CampaignSegmentList from '../campaignSegment/list';

const CampaignRoutes: RouteObject[] = [
    {
        path: '/campaigns',
        element: <CampaignsList />,
    },
    {
        path: '/campaigns-segment',
        element: <CampaignSegmentList />,
    },
    {
        path: '/campaigns/details/:id',
        element: <CompaignDetails />,
    },
];


export default CampaignRoutes