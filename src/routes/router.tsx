import { createBrowserRouter } from 'react-router';
import Dashboard from '@/pages/Dashboard/Dashboard';
import DashboardLayout from '@/layout/dashboard-layout';
import Users from '@/pages/Users/Users';
import LoginPage from '@/pages/Login/LoginPage';
import { ProtectedRoute } from '@/layout/protected-route';
import ContractorDetailsPage from '@/pages/Contractors/Contractors';
import SubscriptionPlansPage from '@/pages/Subscriptions/subscriptions';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'manage-users',
        element: <Users />,
      },
      {
        path: 'contractor-details',
        element: <ContractorDetailsPage />,
      },
      {
        path: 'manage-subscription',
        element: <SubscriptionPlansPage />,
      },
      {
        path: '*',
        element: <h1>404</h1>,
      },
    ],
  },
]);

export default router;


