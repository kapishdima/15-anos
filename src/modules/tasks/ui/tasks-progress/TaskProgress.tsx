import React, { useEffect, useState } from 'react';
import { ProgressCard } from '@components/index';
import { useTasksStore } from '../../store/tasks';
import { useTranslation } from 'react-i18next';

export const TaskProgress: React.FC = () => {
  const { t } = useTranslation();

  const total = useTasksStore((state) => state.total);
  const completed = useTasksStore((state) => state.completed);

  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      const progress = (completed / total) * 100;
      setValue(progress);
    }, 300);

    return () => clearTimeout(id);
  }, [completed, total]);

  return (
    <ProgressCard
      title="Completed"
      value={value}
      hint={`${completed} ${t('tasks_completed_2')} ${total} ${t('tasks_completed_3')}`}
    />
  );
};
