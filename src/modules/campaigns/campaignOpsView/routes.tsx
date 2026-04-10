import { RouteObject } from 'react-router-dom';
import CampaignOpcView from './list';

const CampaignOpsRoutes: RouteObject[] = [
    {
        path: '/campaigns-ops-view',
        element: <CampaignOpcView />,
    }
    
];


export default CampaignOpsRoutes