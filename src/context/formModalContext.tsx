import React from 'react';
import { Task } from '../models';
import dayjs from 'dayjs';

export type FormModalContext = {
  active: Omit<Task, 'id'> | Task | undefined;
  openForm: (task?: Task) => void;
  removeActive: () => void;
};

const defaultValues: Omit<Task, 'id'> = {
  name: '',
  status: 'todo',
  category: '',
  dueDate: dayjs().format('YYYY-MM-DD')
};

export const FormModalContext = React.createContext<FormModalContext | undefined>(undefined);

export const FormModalProvider = ({ children }: { children: JSX.Element }) => {
  const [active, setActive] = React.useState<Omit<Task, 'id'> | Task | undefined>();

  const openForm = (task: Omit<Task, 'id'> | Task | undefined) => {
    setActive(task || defaultValues);
  };

  const removeActive = () => {
    setActive(undefined);
  };

  return (
    <FormModalContext.Provider value={{ active, openForm, removeActive }} children={children} />
  );
};
