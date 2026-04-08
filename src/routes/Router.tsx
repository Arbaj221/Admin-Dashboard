// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from '../components/shared/loadable/Loadable';
import ProtectedRoute from './ProtectedRoute';
import userRoutes from 'src/modules/users/routes';
import clientRoutes from 'src/modules/clients/routes';
import UserProfile from 'src/modules/userProfile/UserProfile';

const FullLayout = Loadable(lazy(() => import('../components/layout/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../modules/shared/pages/BlankLayout')));
const Login2 = Loadable(lazy(() => import('../modules/auth/auth2/Login')));
const Register2 = Loadable(lazy(() => import('../modules/auth/auth2/Register')));
const Maintainance = Loadable(lazy(() => import('../modules/shared/pages/Maintainance')));
const Modern = Loadable(lazy(() => import('../modules/dashboards/Modern')));
const Error = Loadable(lazy(() => import('../modules/shared/pages/Error')));
const SamplePage = lazy(() => import('../modules/sample-page/SamplePage'));

const Router = [
  {
    path: '/',
    element:  <ProtectedRoute><FullLayout /></ProtectedRoute>,
    children: [
      { path: '/', exact: true, element: <Modern /> },
      ...userRoutes,
      ...clientRoutes,
      { path: '/user-profile', exact: true, element: <UserProfile /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/login', element: <Login2 /> },
      { path: '/register', element: <Register2 /> },
      { path: '/auth/maintenance', element: <Maintainance /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);
export default router;
