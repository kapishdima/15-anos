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
  InviteIcon,
} from "@/components/index";
import { AppRoutes } from "./routes";
import { RoleActions } from "@/modules/roles";

export type MenuItem = {
  icon?: JSX.Element;
  title: string;
  path: string;
};

export type Menu = {
  title: string;
  action: RoleActions;
  items: MenuItem[];
};

export const createMenu = (): Menu[] => {
  return [
    {
      title: "Guests",
      action: RoleActions.VIEW_GUEST,
      items: [
        {
          icon: <UsersIcon />,
          title: "Guests list",
          path: AppRoutes.GUESTS_LIST,
        },
      ],
    },
    {
      title: "Tasks",
      action: RoleActions.VIEW_TASKS,
      items: [{ icon: <TasksIcon />, title: "Tasks", path: AppRoutes.ROOT }],
    },
    {
      title: "Payments",
      action: RoleActions.VIEW_PAYMENTS,
      items: [
        {
          icon: <PaymentsIcon />,
          title: "Payments",
          path: AppRoutes.PAYMENTS_LIST,
        },
      ],
    },
    {
      title: "Purchases",
      action: RoleActions.VIEW_PURCHASE,
      items: [
        {
          icon: <PurchaseIcon />,
          title: "Purchases",
          path: AppRoutes.PURCHASES_LIST,
        },
      ],
    },
    {
      title: "Guides & Inspiration",
      action: RoleActions.VIEW_GUIDES,
      items: [
        {
          icon: <ArticlesIcon />,
          title: "Guides and tips",
          path: AppRoutes.POSTS,
        },
      ],
    },
    {
      title: "Vendors",
      action: RoleActions.VIEW_VENDORS,
      items: [
        { icon: <VendorsIcon />, title: "Vendors", path: AppRoutes.VENDORS },
      ],
    },
    {
      title: "Administrative tools",
      action: RoleActions.VIEW_SETTINGS,
      items: [
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
          icon: <InviteIcon />,
          title: "Invite",
          path: AppRoutes.INVITE_SEETINGS,
        },
        {
          icon: <LocaleIcon />,
          title: "Language and region",
          path: AppRoutes.REGION_SETTINGS,
        },
      ],
    },
  ];
};
