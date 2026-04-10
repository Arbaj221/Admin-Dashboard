import { RouteObject } from 'react-router-dom';
import SentinelBatches from './list';

const SentinelBatchesRoute: RouteObject[] = [
    {
        path: '/sentinel-batches',
        element: <SentinelBatches />,
    }
];


export default SentinelBatchesRoute