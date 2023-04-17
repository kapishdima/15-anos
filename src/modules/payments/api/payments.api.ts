import { Timestamp } from 'firebase/firestore';
import { Collections } from '../../../app/constants/collections';
import { getSnapshot } from '../../firebase/firestore';
import { Task, TaskViewModal } from '../store/payments';
import { v4 as uuidv4 } from 'uuid';

const toDate = (date: any) => {
  console.log(date);
  if (date instanceof Timestamp) {
    return date.toDate();
  }

  return date;
};

export const getPayments = async (eventId: string): Promise<TaskViewModal[]> => {
  const tasks = await getSnapshot<Task[]>(Collections.EVENTS, [eventId, Collections.TASKS]);

  console.log(tasks);

  return tasks.map((task) => ({
    ...task,
    id: uuidv4(),
    date: new Date(toDate(task.date)),
    completed: new Date(toDate(task.completed)),
    isCompleted: task.status !== 'undone',
  }));
};
