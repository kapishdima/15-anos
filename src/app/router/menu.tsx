import {
  DesignIcon,
  LocaleIcon,
  PaymentsIcon,
  ProfileIcon,
  PurchaseIcon,
  ArticlesIcon,
  TasksIcon,
  UsersIcon,
  VendorsIcon,
} from "@/components/index";
import { AppRoutes } from "./routes";

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
    Guests: [
      {
        icon: <UsersIcon />,
        title: "Guests list",
        path: AppRoutes.GUESTS_LIST,
      },
    ],
    Tasks: [{ icon: <TasksIcon />, title: "Tasks", path: AppRoutes.ROOT }],
    Payments: [
      {
        icon: <PaymentsIcon />,
        title: "Payments",
        path: AppRoutes.PAYMENTS_LIST,
      },
    ],
    Purchases: [
      {
        icon: <PurchaseIcon />,
        title: "Purchases",
        path: AppRoutes.PURCHASES_LIST,
      },
    ],
    "Guides & Inspiration": [
      {
        icon: <ArticlesIcon />,
        title: "Guides and tips",
        path: AppRoutes.POSTS,
      },
    ],
    Vendors: [
      { icon: <VendorsIcon />, title: "Vendors", path: AppRoutes.VENDORS },
    ],
    "Administrative tools": [
      {
        icon: <ProfileIcon />,
        title: "Quinceañera profile",
        path: AppRoutes.WEDDING_PROFILE,
      },
      {
        icon: <DesignIcon />,
        title: "Design",
        path: AppRoutes.DESIGN_SETTINGS,
      },
      {
        icon: <LocaleIcon />,
        title: "Language and region",
        path: AppRoutes.REGION_SETTINGS,
      },
    ],
  };
};
