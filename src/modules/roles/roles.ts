export const roles = ['viewer', 'assistant', 'owner'] as const;
export type Roles = 'owner' | 'assistant' | 'viewer';

export enum RoleActions {
  VIEW_TASKS = 'tasks.view',
  CREATE_TASK = 'tasks.create',
  DELETE_TASK = 'tasks.delete',
}

export const permissions = {
  owner: [RoleActions.VIEW_TASKS, RoleActions.DELETE_TASK, RoleActions.CREATE_TASK],
  assistant: [RoleActions.VIEW_TASKS, RoleActions.CREATE_TASK],
  viewer: [RoleActions.VIEW_TASKS],
};
