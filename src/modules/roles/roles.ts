export const roles = ['viewer', 'assistant', 'owner'] as const;
export type Roles = 'owner' | 'assistant' | 'viewer';

export enum RoleActions {
  VIEW_TASKS = 'tasks.view',
  CREATE_TASK = 'tasks.create',
  DELETE_TASK = 'tasks.delete',
  CREATE_GUEST = 'guests.create',
  CREATE_PURCHASE = 'purchase.create',
}

export const permissions = {
  owner: [
    RoleActions.VIEW_TASKS,
    RoleActions.DELETE_TASK,
    RoleActions.CREATE_TASK,
    RoleActions.CREATE_GUEST,
    RoleActions.CREATE_PURCHASE,
  ],
  assistant: [RoleActions.VIEW_TASKS, RoleActions.CREATE_TASK, RoleActions.CREATE_GUEST],
  viewer: [RoleActions.VIEW_TASKS],
};
