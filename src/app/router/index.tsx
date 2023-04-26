import { createHashRouter } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { AppRoutes } from './routes';

import { CreateProfilePage, LoginPage } from '@modules/auth';
import { HomePage } from '@modules/home/';
import { PaymentsIndex } from '@/modules/payments';
import { GuestsIndex } from '@/modules/guests';
import { PurchaseBestIdeas, PurchasesIndex } from '@/modules/purchases';

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
  {
    path: AppRoutes.PURCHASES_LIST,
    element: (
      <ProtectedRoute>
        <PurchasesIndex />
      </ProtectedRoute>
    ),
  },
  {
    path: `${AppRoutes.PURCHASES_BEST_IDEAS}/:id`,
    element: (
      <ProtectedRoute>
        <PurchaseBestIdeas />
      </ProtectedRoute>
    ),
  },
]);
