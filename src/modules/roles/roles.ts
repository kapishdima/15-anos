export const roles = ['viewer', 'assistant', 'owner'] as const;
export type Roles = 'owner' | 'assistant' | 'viewer';

export enum RoleActions {
  VIEW_TASKS = 'tasks.view',
  CREATE_TASK = 'tasks.create',
  DELETE_TASK = 'tasks.delete',
  VIEW_GUEST = 'guests.view',
  CREATE_GUEST = 'guests.create',
  DELETE_GUEST = 'guests.delete',
  CREATE_PURCHASE = 'purchase.create',
  DELETE_PURCHASE = 'purchase.delete',
  VIEW_PURCHASE = 'purchase.view',
}

export const permissions = {
  owner: [
    RoleActions.VIEW_TASKS,
    RoleActions.DELETE_TASK,
    RoleActions.CREATE_TASK,
    RoleActions.CREATE_PURCHASE,
    RoleActions.DELETE_PURCHASE,
    RoleActions.VIEW_PURCHASE,
    RoleActions.VIEW_GUEST,
    RoleActions.CREATE_GUEST,
    RoleActions.DELETE_GUEST,
  ],
  assistant: [
    RoleActions.VIEW_TASKS,
    RoleActions.CREATE_TASK,
    RoleActions.CREATE_GUEST,
    RoleActions.VIEW_PURCHASE,
    RoleActions.CREATE_PURCHASE,
    RoleActions.VIEW_GUEST,
    RoleActions.CREATE_GUEST,
  ],

  viewer: [RoleActions.VIEW_TASKS, RoleActions.VIEW_PURCHASE],
};
