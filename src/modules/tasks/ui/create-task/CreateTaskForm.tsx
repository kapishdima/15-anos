import { Form, TextField, CategoriesSelect, DatepickerField, TextAreaField } from '@/components';
import React from 'react';

const defaultValues = {
  date: new Date(),
};

type CreateTaskFormProps = {
  initialValues?: any;
};

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ initialValues }) => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues || defaultValues}>
      <TextField name="name" label="Name" placeholder="Enter task name" />
      <CategoriesSelect name="category" label="Task category" placeholder="Select task category" />
      <DatepickerField name="date" label="Date" placeholder="Select task completion date" />
      <TextAreaField name="notes" label="Notes" placeholder="Enter notes" />
    </Form>
  );
};
