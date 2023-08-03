import React from 'react';
import { FormModalContext } from './formModalContext';

// wrapping context in a hook makes sure users gets a helpful error
export const useFormModal = () => {
  const context = React.useContext(FormModalContext);
  if (!context) {
    throw new Error('useFormModal must be within a FormModalProvider');
  }
  return context;
};
