import { createHashRouter } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { AppRoutes } from './routes';

import { CreateProfilePage, LoginPage } from '@modules/auth';
import { HomePage } from '@modules/home/';
import { PaymentsIndex } from '@/modules/payments';
import { GuestsIndex } from '@/modules/guests';

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
  {
    path: AppRoutes.GUESTS_LIST,
    element: (
      <ProtectedRoute>
        <GuestsIndex />
      </ProtectedRoute>
    ),
  },
]);
