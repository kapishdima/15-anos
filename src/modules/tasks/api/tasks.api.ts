import { Collections } from '../../../app/constants/collections';
import { getSnapshot } from '../../firebase/firestore';
import { Task, TaskViewModal } from '../store/tasks';
import { v4 as uuidv4 } from 'uuid';

export const getTasks = async (eventId: string): Promise<TaskViewModal[]> => {
  const tasks = await getSnapshot<Task[]>(Collections.EVENTS, [eventId, Collections.TASKS]);

  return tasks.map((task) => ({
    ...task,
    id: uuidv4(),
    date: new Date(task.date.toDate()),
    completed: new Date(task.completed.toDate()),
    isCompleted: task.status !== 'undone',
  }));
};
