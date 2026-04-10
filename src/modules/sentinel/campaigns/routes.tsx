import { RouteObject } from 'react-router-dom';
import SentinelCampaigns from './list';

const SentinelCampaignsRoute: RouteObject[] = [
    {
        path: '/sentinel-campaigns',
        element: <SentinelCampaigns />,
    }
];


export default SentinelCampaignsRoute