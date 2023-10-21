export const roles = ["viewer", "assistant", "owner"] as const;
export type Roles = "owner" | "assistant" | "viewer";

export enum RoleActions {
  VIEW_TASKS = "tasks.view",
  CREATE_TASK = "tasks.create",
  DELETE_TASK = "tasks.delete",
  VIEW_GUEST = "guests.view",
  CREATE_GUEST = "guests.create",
  DELETE_GUEST = "guests.delete",
  VIEW_PAYMENTS = "payments.view",
  CREATE_PURCHASE = "purchase.create",
  DELETE_PURCHASE = "purchase.delete",
  VIEW_PURCHASE = "purchase.view",
  VIEW_SETTINGS = "settings.view",
  VIEW_VENDORS = "vendors.view",
  VIEW_GUIDES = "guides.view",
  SPECIFY_EVENT_TITLE = "event-title.specify",
}

export const permissions = {
  owner: [
    RoleActions.VIEW_TASKS,
    RoleActions.VIEW_PURCHASE,
    RoleActions.VIEW_GUEST,
    RoleActions.VIEW_SETTINGS,
    RoleActions.VIEW_PAYMENTS,
    RoleActions.VIEW_GUIDES,
    RoleActions.VIEW_VENDORS,
    RoleActions.DELETE_TASK,
    RoleActions.CREATE_TASK,
    RoleActions.CREATE_PURCHASE,
    RoleActions.DELETE_PURCHASE,
    RoleActions.CREATE_GUEST,
    RoleActions.DELETE_GUEST,
    RoleActions.SPECIFY_EVENT_TITLE,
  ],
  assistant: [
    RoleActions.VIEW_TASKS,
    RoleActions.VIEW_GUEST,
    RoleActions.VIEW_SETTINGS,
    RoleActions.VIEW_PURCHASE,
    RoleActions.VIEW_PAYMENTS,
    RoleActions.VIEW_GUIDES,
    RoleActions.VIEW_VENDORS,
    RoleActions.CREATE_TASK,
    RoleActions.CREATE_GUEST,
    RoleActions.CREATE_PURCHASE,
    RoleActions.CREATE_GUEST,
  ],

  viewer: [
    RoleActions.VIEW_TASKS,
    RoleActions.VIEW_GUEST,
    RoleActions.VIEW_PURCHASE,
    RoleActions.VIEW_PAYMENTS,
    RoleActions.VIEW_GUIDES,
    RoleActions.VIEW_VENDORS,
  ],
};
