import { createHashRouter } from 'react-router-dom';
import { LoginPage } from '../../modules/auth/pages/LoginPage';
import { CreateProfilePage } from '../../modules/auth/pages/CreateProfilePage';
import { HomePage } from '../../modules/home/pages/HomePage';

import { ProtectedRoute } from './ProtectedRoute';

export const router = createHashRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile/create',
    element: <CreateProfilePage />,
  },
]);
