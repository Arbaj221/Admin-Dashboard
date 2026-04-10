import { RouteObject } from 'react-router-dom';
import CampaignOpcView from './list';

const CampaignOpcRoutes: RouteObject[] = [
    {
        path: '/campaigns-opc-view',
        element: <CampaignOpcView />,
    }
    
];


export default CampaignOpcRoutes