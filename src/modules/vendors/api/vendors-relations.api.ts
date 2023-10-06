import { Collections } from "@/app/constants/collections";
import { getEventId } from "@/modules/event";
import { toDate, getSnapshotCollection } from "@/modules/firebase/firestore";
import { Payment } from "@/modules/payments/store/payments";
import { Task } from "@/modules/tasks/store/tasks";
import { where } from "firebase/firestore";

export const getVendorTasks = async (vendorId: string) => {
  const eventId = getEventId();
  const tasks = await getSnapshotCollection<Task[]>(
    Collections.EVENTS,
    [eventId, Collections.TASKS],
    [where("vendorId", "==", vendorId)]
  );

  if (!tasks) {
    return [];
  }

  return tasks.map((task) => ({
    ...task,
    date: new Date(toDate(task.date)),
    completed: new Date(toDate(task.completed)),
    isCompleted: task.status !== "undone",
  }));
};

export const getVendorPayments = async (vendorId: string) => {
  const eventId = getEventId();
  const payments = await getSnapshotCollection<Payment[]>(
    Collections.EVENTS,
    [eventId, Collections.PAYMENTS],
    [where("vendorId", "==", vendorId)]
  );

  if (!payments) {
    return [];
  }

  return payments.map((payment) => {
    return {
      ...payment,
      isCompleted: payment.wasPaid,
      date: new Date(toDate(payment.date)),
      completed: new Date(toDate(payment.completed)),
    };
  });
};
