import React from 'react';
import {
  AppLayout,
  CategoriesSelect,
  DatepickerField,
  Form,
  PageHeader,
  TextAreaField,
  TextField,
} from '@/components';
import { useTranslation } from 'react-i18next';
import { UseFormReset, FieldValues } from 'react-hook-form';
import { useTasksStore } from '../store/tasks';

export const SignleTaskPage = () => {
  const { t } = useTranslation();

  const updateTask = useTasksStore((state) => state.updateTask);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  const getStoredTask = useTasksStore((state) => state.getStoredTask);

  const updateTaskOnClick = async (values: any) => {
    const task = getStoredTask();
    await updateTask(task.id, values);
    // close(TASK_MODAL_ID);
    fetchTasks(/*force*/ true);
  };

  return (
    <AppLayout>
      <div className="task-page">
        <PageHeader
          title="Tasks"
          //   actions={
          //     <>
          //       <CreateTask />
          //       <RemoveTask />
          //     </>
          //   }
        />

        <div className="task-info">
          <Form onSubmit={updateTaskOnClick}>
            <TextField name="title" label={t('Name')} placeholder={t('Task name')} />
            <DatepickerField
              name="date"
              label={t('Date')}
              placeholder={t('Select date')}
              showTimeSelect={false}
            />
            <CategoriesSelect
              name="categoryId"
              label={t('Task category')}
              placeholder={t('Select category')}
            />
            <TextAreaField name="notes" label={t('Notes')} placeholder={t('Enter notes')} />
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};
