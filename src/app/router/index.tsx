import { createHashRouter } from 'react-router-dom';
import { LoginPage } from '../../modules/auth/pages/LoginPage';
import { CreateProfilePage } from '../../modules/auth/pages/CreateProfilePage';
import { HomePage } from '../../modules/home/pages/HomePage';

import { ProtectedRoute } from './ProtectedRoute';
import { AppRoutes } from './routes';
import { PaymentsIndex } from '@/modules/payments';

export const router = createHashRouter([
  {
    path: AppRoutes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: AppRoutes.CREATE_PROFILE,
    element: <CreateProfilePage />,
  },
  {
    path: AppRoutes.ROOT,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoutes.PAYMENTS_LIST,
    element: (
      <ProtectedRoute>
        <PaymentsIndex />
      </ProtectedRoute>
    ),
  },
]);
