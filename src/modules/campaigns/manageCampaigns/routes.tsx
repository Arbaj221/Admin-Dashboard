import { RouteObject } from 'react-router-dom';
import CampaignsList from './list';
import CreateCampaign from './create';
import EditCampaign from './edit';

const CampaignRoutes: RouteObject[] = [
    {
        path: '/campaigns',
        element: <CampaignsList />,
    },
    {
        path: '/campaigns/create',
        element: <CreateCampaign />,
    },
    {
        path: '/campaigns/edit/:id',
        element: <EditCampaign />,
    }
];


export default CampaignRoutes