import { RouteObject } from 'react-router-dom';
import AppSettingsList from './list';

const appSettingsRoutes: RouteObject[] = [
    {
        path: '/admin/app-settings',
        element: <AppSettingsList />,
    }
];

export default appSettingsRoutes;