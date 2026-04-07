// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from '../components/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../components/layout/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../modules/shared/pages/BlankLayout')));

// authentication

const Login2 = Loadable(lazy(() => import('../modules/auth/auth2/Login')));

const Register2 = Loadable(lazy(() => import('../modules/auth/auth2/Register')));

const Maintainance = Loadable(lazy(() => import('../modules/shared/pages/Maintainance')));

// Dashboards
const Modern = Loadable(lazy(() => import('../modules/dashboards/Modern')));


const Error = Loadable(lazy(() => import('../modules/shared/pages/Error')));

// // icons

const SamplePage = lazy(() => import('../modules/sample-page/SamplePage'));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <Modern /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> }

    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/auth2/login', element: <Login2 /> },

      { path: '/auth/auth2/register', element: <Register2 /> },

      { path: '/auth/maintenance', element: <Maintainance /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
