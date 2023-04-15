import React from 'react';

import { TaskViewModal, groupByDay, usePaymentsStore } from '@modules/payments';
import { getCategoryById, useCategoriesStore } from '@modules/categories';

import { PaymentCard } from './PaymentCard';
import { PaymentsMonth } from './PaymentsMonth';
import { PaymentDay } from './PaymentsDay';

import MockTaskIcon from '@image/icons/task-icon.svg';

type PaymentGroupProps = {
  title: string;
  tasks: TaskViewModal[];
};

export const PaymentGroup: React.FC<PaymentGroupProps> = ({ title, tasks }) => {
  const groupedByDay = groupByDay(tasks);
  const categoriesStore = useCategoriesStore();
  const paymentsStore = usePaymentsStore();

  return (
    <>
      <PaymentsMonth title={title.split(',')[0]} tasks={tasks} />
      {Object.entries(groupedByDay).map(([date, dayTasks]) => (
        <div className="task-list__group">
          <PaymentDay title={date} tasks={dayTasks} />
          {dayTasks.map((task) => {
            const category = getCategoryById(categoriesStore.categories, task.categoryId);
            return (
              <PaymentCard
                id={task.id}
                name={task.title['en']}
                image={MockTaskIcon}
                completed={task.isCompleted}
                color={`#${category?.color}`}
                category={category?.title['en'] || ''}
                date={task.date}
                notes={task.notes}
                isRemoval={paymentsStore.isRemoval}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};
