export const roles = ['viewer', 'assistant', 'owner'] as const;
export type Roles = 'owner' | 'assistant' | 'viewer';

export enum RoleActions {
  VIEW_TASKS = 'tasks.view',
  CREATE_TASK = 'tasks.create',
  DELETE_TASK = 'tasks.delete',
  CREATE_GUEST = 'guests.create',
  CREATE_PURCHASE = 'purchase.create',
  DELETE_PURCHASE = 'purchase.delete',
  VIEW_PURCHASE = 'purchase.view',
}

export const permissions = {
  owner: [
    RoleActions.VIEW_TASKS,
    RoleActions.DELETE_TASK,
    RoleActions.CREATE_TASK,
    RoleActions.CREATE_GUEST,
    RoleActions.CREATE_PURCHASE,
    RoleActions.DELETE_PURCHASE,
    RoleActions.VIEW_PURCHASE,
  ],
  assistant: [
    RoleActions.VIEW_TASKS,
    RoleActions.CREATE_TASK,
    RoleActions.CREATE_GUEST,
    RoleActions.CREATE_PURCHASE,
  ],

  viewer: [RoleActions.VIEW_TASKS, RoleActions.VIEW_PURCHASE],
};
