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

//pages
const UserProfile = Loadable(lazy(() => import('../modules/user-profile/UserProfile')));

/* ****Apps***** */
const Notes = Loadable(lazy(() => import('../modules/notes/Notes')));
const Form = Loadable(lazy(() => import('../modules/form/Form')));
const Table = Loadable(lazy(() => import('../modules/table/Table')));
const Tickets = Loadable(lazy(() => import('../modules/tickets/Tickets')));
const CreateTickets = Loadable(lazy(() => import('../modules/tickets/CreateTickets')));
const Blog = Loadable(lazy(() => import('../modules/blog/Blog')));
const BlogDetail = Loadable(lazy(() => import('../modules/blog/BlogDetail')));

const Error = Loadable(lazy(() => import('../modules/shared/pages/Error')));

// // icons
const SolarIcon = Loadable(lazy(() => import('../modules/icons/SolarIcon')));

const SamplePage = lazy(() => import('../modules/sample-page/SamplePage'));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <Modern /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },

      { path: '/apps/notes', element: <Notes /> },
      { path: '/utilities/form', element: <Form /> },
      { path: '/utilities/table', element: <Table /> },
      { path: '/apps/tickets', element: <Tickets /> },
      { path: '/apps/tickets/create', element: <CreateTickets /> },
      { path: '/apps/blog/post', element: <Blog /> },
      { path: '/apps/blog/detail/:id', element: <BlogDetail /> },
      { path: '/user-profile', element: <UserProfile /> },
      { path: '/icons/iconify', element: <SolarIcon /> },
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
