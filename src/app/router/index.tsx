import { createHashRouter } from 'react-router-dom';
import { LoginPage } from '../../modules/auth/pages/LoginPage';
import { CreateProfilePage } from '../../modules/auth/pages/CreateProfilePage';
import { HomePage } from '../../modules/home/pages/HomePage';

export const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
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
