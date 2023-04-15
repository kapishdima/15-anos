import { PaymentsIcon, TasksIcon, UsersIcon } from '@/components/index';
import { AppRoutes } from './routes';

export type MenuItem = {
  icon?: JSX.Element;
  title: string;
  path: string;
};

export type Menu = {
  [key: string]: MenuItem[];
};

export const createMenu = () => {
  return {
    Guests: [{ icon: <UsersIcon />, title: 'Guests list', path: AppRoutes.GUESTS_LIST }],
    Tasks: [{ icon: <TasksIcon />, title: 'Tasks list', path: AppRoutes.ROOT }],
    Payments: [{ icon: <PaymentsIcon />, title: 'Payments list', path: AppRoutes.PAYMENTS_LIST }],
  };
};
