import { RouteObject } from 'react-router-dom';
import SentinelJobs from './list';

const SentinelJobsRoute: RouteObject[] = [
    {
        path: '/sentinel-jobs',
        element: <SentinelJobs />,
    }
];


export default SentinelJobsRoute