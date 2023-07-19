import React from 'react';
import { TaskContext } from './taskContext';

export const useTaskContext = () => {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error('useFormModal must be within a FormModalProvider');
  }
  return context;
};
