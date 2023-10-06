import React, { PropsWithChildren, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  UseFormReset,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ObjectSchema } from "yup";
import classNames from "classnames";

import { Events, EventEmitter } from "@app/transport/event-bus";
import { useDebounce } from "usehooks-ts";

type FormProps = PropsWithChildren & {
  id?: string;
  onSubmit: (values: any, reset?: UseFormReset<FieldValues>) => void;
  initialValues?: any;
  classes?: string;
  schema?: ObjectSchema<any>;
  submitAfterDelay?: boolean;
};

export const Form: React.FC<FormProps> = ({
  onSubmit,
  initialValues,
  children,
  classes,
  schema,
  id,
  submitAfterDelay,
}) => {
  const form = useForm({
    defaultValues: initialValues,
    resolver: schema ? yupResolver(schema) : undefined,
  });

  const debouncedValue = useDebounce<any>(form.getValues(), 3000);

  const submit = (values: any) => {
    onSubmit(values, form.reset);
  };

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues]);

  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState, form.reset]);

  useEffect(() => {
    EventEmitter.subscribe(Events.CLOSE_MODAL, () => {
      form.reset(initialValues, { keepValues: false });
    });
  }, []);

  useEffect(() => {
    EventEmitter.dispatch(Events.FORM_MODIFY, {
      isDirty: form.formState.isDirty,
      id,
    });
  }, [form.formState.isDirty]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className={classNames("form-container", classes)}
      >
        {children}
      </form>
    </FormProvider>
  );
};
