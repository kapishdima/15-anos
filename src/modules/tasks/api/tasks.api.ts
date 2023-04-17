import { Collections } from '@app/constants/collections';
import {
  deleteDocument,
  fromDate,
  getSnapshot,
  pushData,
  toDate,
  updateDocument,
} from '@modules/firebase/firestore';
import { getEventId } from '@/modules/event';

import { Task, TaskViewModal } from '../store/tasks';

export const getTasks = async (): Promise<TaskViewModal[]> => {
  const eventId = getEventId();
  const tasks = await getSnapshot<Task[]>(Collections.EVENTS, [eventId, Collections.TASKS]);

  return tasks.map((task) => ({
    ...task,
    date: new Date(toDate(task.date)),
    completed: new Date(toDate(task.completed)),
    isCompleted: task.status !== 'undone',
  }));
};

export const removeTask = async (id: string) => {
  const eventId = getEventId();
  return deleteDocument(Collections.EVENTS, [eventId, Collections.TASKS, id]);
};

export const updateTask = async (id: string, payload: any) => {
  const eventId = getEventId();
  return updateDocument(Collections.EVENTS, [eventId, Collections.TASKS, id], payload);
};

export const createTask = async (payload: any) => {
  const eventId = getEventId();

  const taskData = {
    ...payload,
    status: 'undone',
    vendorId: 'none',
    date: fromDate(payload.date),
  };
  return pushData(Collections.EVENTS, [eventId, Collections.TASKS, payload.title], taskData);
};

export const updateTaskStatus = async (id: string, status: 'undone' | 'done') => {
  return await updateTask(id, { status });
};
